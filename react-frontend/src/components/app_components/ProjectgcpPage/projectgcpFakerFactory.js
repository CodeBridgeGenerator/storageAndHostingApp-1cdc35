
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
projectId: faker.lorem.sentence(""),
env: faker.lorem.sentence(""),
gcpProjectId: faker.lorem.sentence(""),
location: faker.lorem.sentence(""),
imageUri: faker.lorem.sentence(""),
imageName: faker.lorem.sentence(""),
authentication: faker.lorem.sentence(""),
serviceAccount: faker.lorem.sentence(""),
memory: faker.lorem.sentence(""),
cpu: faker.lorem.sentence(""),
concurrency: faker.lorem.sentence(""),
maxInstances: faker.lorem.sentence(""),
minInstances: faker.lorem.sentence(""),
vpcConnector: faker.lorem.sentence(""),
vpcEgress: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
