import { faker } from "@faker-js/faker";
export default (user, count) => {
  let data = [];
  for (let i = 0; i < count; i++) {
    const fake = {
      billType: faker.lorem.sentence(1),
      category: faker.lorem.sentence(1),
      items: faker.lorem.sentence(1),
      description: faker.lorem.sentence(1),
      base: faker.lorem.sentence(1),
      unit: faker.lorem.sentence(1),
      markUp10: faker.lorem.sentence(1),
      finalAmount: faker.lorem.sentence(1),
      currency: faker.lorem.sentence(1),
      planLimit: faker.lorem.sentence(1),

      updatedBy: user._id,
      createdBy: user._id,
    };
    data = [...data, fake];
  }
  return data;
};
