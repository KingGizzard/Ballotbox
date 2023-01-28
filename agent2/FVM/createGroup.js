import { Group } from "@semaphore-protocol/group";

export async function createGroup (identityCommittment) {
    const group = new Group(20);
    group.addMember(identityCommittment)

    return group;
};