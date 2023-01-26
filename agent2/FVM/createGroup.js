import { Group } from "@semaphore-protocol/group";
import * as fs from 'fs/promises';

export async function createGroup () {
    const identityCommitmentSelf = await fs.readFile("./public/commitment.pub", "utf-8");
    const dummyCommitment0 = await fs.readFile("../utils/dummies/dummies_0_committment.pub", "utf-8");

    const group = new Group(20);
    group.addMembers([identityCommitmentSelf, dummyCommitment0])

    return group;
};