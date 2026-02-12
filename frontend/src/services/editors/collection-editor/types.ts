export interface CollectionEditorConfig {
    context: {
        identifier: string;
        channel: string;
        authToken: string;
        sid: string;
        did: string;
        uid: string;
        additionalCategories: string[];
        host: string;
        pdata: {
            id: string;
            ver: string;
            pid: string;
        };
        actor: {
            id: string;
            type: string;
        };
        contextRollup: {
            l1: string;
        };
        tags: string[];
        timeDiff: number;
        endpoint: string;
        env: string;
        user: {
            id: string;
            orgIds: string[];
            organisations: Record<string, any>;
            fullName: string;
            firstName: string;
            lastName: string;
            isRootOrgAdmin: boolean;
        };
        channelData: Record<string, any>;
        cloudStorageUrls?: string[];
        cloudStorage?: {
            presigned_headers?: Record<string, any>;
        };
        framework: string;
    };
    config: {
        mode: string;
        maxDepth: number;
        objectType: string;
        primaryCategory: string;
        isRoot: boolean;
        iconClass: string;
        children: Record<string, any>;
        hierarchy: Record<string, any>;
        [key: string]: any;
    };
}

export interface CollectionEditorEvent {
    type: string;
    data?: any;
    [key: string]: any;
}
