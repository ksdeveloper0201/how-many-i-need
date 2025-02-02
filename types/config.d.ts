declare interface redirectObj {
    id: number;
    label: string;
    url: string;
}

declare interface AccordionObj {
    chunkId: number;
    chunkLabel: string;
    redirectList: redirectObj[];
}
