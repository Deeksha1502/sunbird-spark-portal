import { CollectionEditorConfig, CollectionEditorEvent } from './types';
import userAuthInfoService from '../../userAuthInfoService/userAuthInfoService';
import appCoreService from '../../AppCoreService';
import { OrganizationService } from '../../OrganizationService';

export class CollectionEditorService {
    private eventHandlers = new WeakMap<HTMLElement, { editor: (event: Event) => void }>();
    private orgService = new OrganizationService();
    private static stylesLoaded = false;

    async createConfig(
        identifier: string,
        mode: string = 'edit'
    ): Promise<CollectionEditorConfig> {
        const sid = userAuthInfoService.getSessionId() || `session-${Date.now()}`;
        const uid = userAuthInfoService.getUserId() || 'anonymous';
        let did = `device-${Date.now()}`;
        try {
            did = await appCoreService.getDeviceId();
        } catch (error) {
            console.warn('Failed to fetch device ID, using fallback:', error);
        }

        let channel = `test-channel-${Math.random().toString(36).substring(2, 15)}`;
        let channelData = {};
        try {
            const orgResponse = await this.orgService.search({
                filters: { isTenant: true }
            });
            const org = orgResponse?.data?.result?.response?.content?.[0];
            if (org) {
                channel = org.channel;
                channelData = org;
            }
        } catch (error) {
            console.warn('Failed to fetch channel info:', error);
        }

        // Default configuration based on the provided snippet
        // In a real app, many of these values would come from the backend or context
        const config: CollectionEditorConfig = {
            context: {
                identifier,
                channel,
                authToken: '', // Should be populated if auth handles it or empty if cookie based
                sid,
                did,
                uid,
                additionalCategories: ["Textbook", "Lesson Plan", "Curiosity Question Set", "Experiential Resource", "Explanation Video", "Focus Spot", "Learning Outcome Definition", "Lesson Plan", "Marking Scheme Rubric", "Pedagogy Flow", "Previous Board Exam Papers", "TV Lesson", "Textbook"],
                host: window.location.origin,
                pdata: {
                    id: 'local.sunbird.knowledge.portal',
                    ver: '1.0.0',
                    pid: 'sunbird-knowledge-portal.collection_editor'
                },
                actor: {
                    id: uid,
                    type: 'User'
                },
                contextRollup: {
                    l1: channel
                },
                tags: [channel],
                timeDiff: -0.463,
                endpoint: '/data/v3/telemetry',
                env: 'collection_editor',
                user: {
                    id: uid,
                    orgIds: [channel],
                    organisations: {},
                    fullName: 'Test User',
                    firstName: 'Test',
                    lastName: 'User',
                    isRootOrgAdmin: true
                },
                channelData: channelData,
                framework: 'knowlg_k-12', // detailed framework data usually fetched
            },
            config: {
                mode,
                maxDepth: 4,
                objectType: 'Collection',
                primaryCategory: 'Content Playlist',
                isRoot: true,
                iconClass: 'fa fa-book',
                children: {},
                hierarchy: {
                    // Hierarchy usually fetched by the editor or passed in. 
                    // For new collections, this might be empty or basic structure.
                }
            }
        };

        return config;
    }

    private loadAssets(): void {
        if (CollectionEditorService.stylesLoaded) return;

        // Load styles
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = '/assets/collection-editor/styles.css';
        styleLink.setAttribute('data-collection-editor-styles', 'true');
        document.head.appendChild(styleLink);

        // Load script if not using standard import or if web component requires it
        // The web component usually registers itself when imported.
        // Use dynamic import or script tag if needed. 
        // Assuming the package import in the component handles registration.

        CollectionEditorService.stylesLoaded = true;
    }

    createElement(config: CollectionEditorConfig): HTMLElement {
        this.loadAssets();

        const element = document.createElement('lib-editor');
        element.setAttribute('editor-config', JSON.stringify(config));

        return element;
    }

    attachEventListeners(
        element: HTMLElement,
        onEditorEvent?: (event: CollectionEditorEvent) => void
    ): void {
        this.removeEventListeners(element);

        const editorHandler = (event: Event) => {
            const customEvent = event as CustomEvent;
            console.log("On editorEmitter", customEvent);
            if (onEditorEvent) {
                onEditorEvent({
                    type: 'editorEmitter',
                    data: customEvent.detail
                });
            }
        };

        element.addEventListener('editorEmitter', editorHandler);
        this.eventHandlers.set(element, { editor: editorHandler });
    }

    removeEventListeners(element: HTMLElement): void {
        const handlers = this.eventHandlers.get(element);
        if (handlers) {
            element.removeEventListener('editorEmitter', handlers.editor);
            this.eventHandlers.delete(element);
        }
    }
}
