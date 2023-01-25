import { Group } from "@semaphore-protocol/group";
import * as fs from 'fs/promises';

export async function createGroup () {
    const identityCommitment = await fs.readFile("./public/commitment.pub", "utf-8");

    const group = new Group(20);
    group.addMember(BigInt(identityCommitment));

    return group;
};