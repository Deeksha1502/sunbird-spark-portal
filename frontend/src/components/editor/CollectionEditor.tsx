import React, { useEffect, useRef, useCallback, useState } from 'react';
import { CollectionEditorService } from '../../services/editors/collection-editor';
import type { CollectionEditorEvent } from '../../services/editors/collection-editor';

interface CollectionEditorProps {
    identifier: string;
    mode?: string;
    onEditorEvent?: (event: CollectionEditorEvent) => void;
}

export const CollectionEditor: React.FC<CollectionEditorProps> = ({
    identifier,
    mode = 'edit',
    onEditorEvent
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const serviceRef = useRef<CollectionEditorService>(new CollectionEditorService());
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
    const [errorMessage, setErrorMessage] = useState('');

    // Memoize event handler to maintain referential equality
    const handleEditorEvent = useCallback((event: CollectionEditorEvent) => {
        onEditorEvent?.(event);
    }, [onEditorEvent]);

    useEffect(() => {
        let editorElement: HTMLElement | null = null;
        let cancelled = false;

        const loadDependencies = async () => {
            try {
                // 1. Load Reflect Metadata
                if (!Reflect || !(Reflect as any).getMetadata) {
                    // @ts-ignore
                    await import('reflect-metadata');
                }

                // 2. Load jQuery and Fancytree
                if (!(window as any).$) {
                    // @ts-ignore
                    const { default: jq } = await import('jquery');
                    (window as any).$ = jq;
                    (window as any).jQuery = jq;
                }

                if (!(window as any).$.ui) {
                    await new Promise<void>((resolve, reject) => {
                        const script = document.createElement('script');
                        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/jquery-ui.min.js';
                        script.async = true;
                        script.onload = () => resolve();
                        script.onerror = (e) => reject(new Error('Failed to load jquery-ui script'));
                        document.body.appendChild(script);
                    });
                }

                if (!(window as any).$.fn.fancytree) {
                    await new Promise<void>((resolve, reject) => {
                        const script = document.createElement('script');
                        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery.fancytree/2.38.3/jquery.fancytree-all.min.js';
                        script.async = true;
                        script.onload = () => resolve();
                        script.onerror = (e) => reject(new Error('Failed to load jquery.fancytree script'));
                        document.body.appendChild(script);
                    });
                }

                // 3. Load the Collection Editor Web Component Script
                if (!customElements.get('lib-editor')) {
                    await new Promise<void>((resolve, reject) => {
                        const script = document.createElement('script');
                        script.src = '/assets/collection-editor/sunbird-collection-editor.js';
                        script.async = true;
                        script.onload = () => resolve();
                        script.onerror = (e) => reject(new Error('Failed to load collection editor script'));
                        document.body.appendChild(script);
                    });
                }

                return true;
            } catch (error) {
                console.error("Failed to load dependencies:", error);
                throw error;
            }
        };

        const initEditor = async () => {
            try {
                await loadDependencies();

                if (cancelled) return;

                const service = serviceRef.current;
                const config = await service.createConfig(identifier, mode);

                if (cancelled) return;

                editorElement = service.createElement(config);
                service.attachEventListeners(editorElement, handleEditorEvent);

                if (containerRef.current) {
                    containerRef.current.innerHTML = ''; // Clear previous content
                    containerRef.current.appendChild(editorElement);
                }
                setStatus('ready');
            } catch (error: any) {
                console.error('Failed to initialize Collection Editor:', error);
                setErrorMessage(error.message || 'Unknown error');
                setStatus('error');
            }
        };

        initEditor();

        return () => {
            cancelled = true;
            if (editorElement) {
                serviceRef.current.removeEventListeners(editorElement);
                editorElement.remove();
            }
        };
    }, [identifier, mode, handleEditorEvent]);

    if (status === 'error') {
        return <div className="text-red-500 p-4">Error loading editor: {errorMessage}</div>;
    }

    return (
        <div className="w-full h-full min-h-[600px] relative" id="collection-editor-wrapper">
            {status === 'loading' && <div className="p-4">Loading Editor...</div>}
            <div
                ref={containerRef}
                className="w-full h-full"
                id="collection-editor-container"
            />
        </div>
    );
};
