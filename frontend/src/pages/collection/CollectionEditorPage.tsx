import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { CollectionEditor } from '../../components/editor/CollectionEditor';

const CollectionEditorPage: React.FC = () => {
    const { identifier } = useParams<{ identifier: string }>();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') || 'edit';

    const handleEditorEvent = (event: any) => {
        console.log('Editor Event:', event);
    };

    if (!identifier) {
        return <div className="p-4">Please provide a collection identifier in the URL.</div>;
    }

    return (
        <div className="h-screen w-full">
            <CollectionEditor
                identifier={identifier}
                mode={mode}
                onEditorEvent={handleEditorEvent}
            />
        </div>
    );
};

export default CollectionEditorPage;
