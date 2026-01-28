'use client';

import CmsEditor from '@/components/cms/CmsEditor';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function EditorContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    return <CmsEditor articleId={id || undefined} />;
}

export default function CreateArticlePage() {
    return (
        <Suspense fallback={<div>Loading editor...</div>}>
            <EditorContent />
        </Suspense>
    );
}
