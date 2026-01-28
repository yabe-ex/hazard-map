import styles from '@/app/article.module.css';

export default function MarkdownRenderer({ content }: { content: string }) {
    if (!content) return null;

    // Very basic markdown parser
    // In a real production app, use 'react-markdown' or 'remark'

    // Improved line-by-line parser with buffer for paragraphs
    const lines = content.split('\n');
    let html = '';
    let state: 'normal' | 'ul' | 'ol' | 'table' | 'dl' = 'normal';
    let pBuffer: string[] = [];

    // Helper to process inline styles
    const processInline = (text: string) => {
        return text
            .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
            .replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, fullUrl) => {
                // Split by space to handle: url =width
                // Handle generated text that might have spaces
                const parts = fullUrl.trim().split(/\s+/);
                let src = parts[0];
                let width = '';

                // Handle <url> syntax if present (remove angle brackets)
                if (src.startsWith('<') && src.endsWith('>')) {
                    src = src.slice(1, -1);
                }

                // Check for width parameter starting with '='
                for (let i = 1; i < parts.length; i++) {
                    if (parts[i].startsWith('=')) {
                        width = parts[i].substring(1);
                        break;
                    }
                }

                const style = width ? `width: ${width}; max-width: 100%;` : '';
                const styleAttr = style ? ` style="${style}"` : '';
                return `<img src="${src}" alt="${alt}"${styleAttr} />`;
            })
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
            .replace(/<span(.*?)>(.*?)<\/span>/g, '<span$1>$2</span>');
    };

    const flushBuffer = () => {
        if (pBuffer.length > 0) {
            // Join with space for standard behavior, or empty string. 
            // Since explicit <br> is discouraged, we let the browser wrap text.
            // We'll join with a space to prevent word concatenation in English, 
            // though it adds space in Japanese. Usually acceptable.
            html += `<p>${processInline(pBuffer.join(' '))}</p>\n`;
            pBuffer = [];
        }
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // Empty line handling
        if (!trimmed) {
            flushBuffer();
            if (state === 'ul') html += '</ul>\n';
            if (state === 'ol') html += '</ol>\n';
            if (state === 'table') html += '</tbody></table></div>\n';
            if (state === 'dl') html += '</dl>\n';
            state = 'normal';
            continue;
        }

        // Headers (Shifted: # -> h2, ## -> h3, ### -> h4)
        if (line.match(/^# /)) {
            flushBuffer();
            html += `<h2>${processInline(line.substring(2))}</h2>\n`;
            continue;
        }
        if (line.match(/^## /)) {
            flushBuffer();
            html += `<h3>${processInline(line.substring(3))}</h3>\n`;
            continue;
        }
        if (line.match(/^### /)) {
            flushBuffer();
            html += `<h4>${processInline(line.substring(4))}</h4>\n`;
            continue;
        }

        // Unordered List
        if (line.match(/^[-*] /)) {
            flushBuffer();
            if (state !== 'ul') {
                if (state === 'ol') html += '</ol>\n';
                html += '<ul>\n';
                state = 'ul';
            }
            html += `<li>${processInline(line.replace(/^[-*] /, ''))}</li>\n`;
            continue;
        }

        // Ordered List
        if (line.match(/^\d+\. /)) {
            flushBuffer();
            if (state !== 'ol') {
                if (state === 'ul') html += '</ul>\n';
                html += '<ol>\n';
                state = 'ol';
            }
            html += `<li>${processInline(line.replace(/^\d+\. /, ''))}</li>\n`;
            continue;
        }

        // Table
        if (line.includes('|')) {
            flushBuffer();
            if (state !== 'table') {
                html += '<div class="tableWrapper"><table>\n';
                // Check if next line is separator line (---)
                if (lines[i + 1] && lines[i + 1].includes('---')) {
                    html += '<thead><tr>';
                    line.split('|').filter(c => c.trim()).forEach(c => {
                        html += `<th>${processInline(c.trim())}</th>`;
                    });
                    html += '</tr></thead><tbody>\n';
                    i++; // Skip separator line
                } else {
                    html += '<tbody><tr>';
                    line.split('|').filter(c => c.trim()).forEach(c => {
                        html += `<td>${processInline(c.trim())}</td>`;
                    });
                    html += '</tr>';
                }
                state = 'table';
            } else {
                html += '<tr>';
                line.split('|').filter(c => c.trim()).forEach(c => {
                    html += `<td>${processInline(c.trim())}</td>`;
                });
                html += '</tr>\n';
            }
            continue;
        }

        // Explicit HTML Block check
        // Check if trimmed line starts with a block tag
        const tagMatch = trimmed.match(/^<\/?(\w+)/);
        if (tagMatch) {
            const tagName = tagMatch[1].toLowerCase();
            const blockTags = ['div', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td', 'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'p', 'blockquote', 'hr', 'pre', 'script', 'style'];
            if (blockTags.includes(tagName)) {
                flushBuffer();
                html += line + '\n';
                continue;
            }
        }

        // Close lists if we hit non-list line (and it wasn't caught above)
        if (state === 'ul' || state === 'ol' || state === 'table') {
            if (state === 'ul') html += '</ul>\n';
            if (state === 'ol') html += '</ol>\n';
            if (state === 'table') html += '</tbody></table></div>\n';
            state = 'normal';
        }

        // It's a paragraph line
        pBuffer.push(line);
    }

    // Flush remaining buffer
    flushBuffer();

    // Close open states at end
    if (state === 'ul') html += '</ul>\n';
    if (state === 'ol') html += '</ol>\n';
    if (state === 'table') html += '</tbody></table></div>\n';
    if (state === 'dl') html += '</dl>\n';

    const htmlContent = html;

    return (
        <div className={styles.markdownBody} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
}
