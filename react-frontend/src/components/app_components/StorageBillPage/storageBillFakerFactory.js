
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
type: faker.lorem.sentence(""),
gbStored: faker.lorem.sentence(""),
gbDownloaded: faker.lorem.sentence(""),
uploadOperations: faker.lorem.sentence(""),
downloadOperations: faker.lorem.sentence(""),
bucketsPerProject: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
