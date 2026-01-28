export default function MarkdownRenderer({ content }: { content: string }) {
    if (!content) return null;

    // Very basic markdown parser
    // In a real production app, use 'react-markdown' or 'remark'
    const htmlContent = content
        .replace(/^# (.*$)/gim, '<h1 style="font-size: 2em; font-weight: bold; margin-bottom: 20px;">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 style="font-size: 1.5em; font-weight: bold; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #ddd; padding-bottom: 5px;">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 style="font-size: 1.25em; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">$1</h3>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" style="max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0;" />')
        .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" style="color: #3498db; text-decoration: underline;">$1</a>')
        .replace(/\n/gim, '<br />');

    return (
        <div style={{ lineHeight: '1.8', fontSize: '16px', color: '#333' }} dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
}
