import "dotenv/config";
import { Midjourney } from "../src";
/**
 *
 * a simple example of using the imagine api with ws
 * ```
 * npx tsx example/imagine-ws.ts
 * ```
 */

// export SERVER_ID="1302884522014019675"
// export CHANNEL_ID="1302884522806870061"
// export SALAI_TOKEN="MTE3MTY3MzAxODQzNTY0NTQ3Mg.GJD9As.jPWYiO-G_gVIqTjgeYyRsjyRnUAxGvRYL8IYbQ"

async function main(prompt) {
  console.log('prompt');
  console.log(prompt);
  const client = new Midjourney({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    HuggingFaceToken: <string>process.env.HUGGINGFACE_TOKEN,
    Debug: true,
    Ws: true, // required  `Only you can see this`
  });
  await client.Connect(); // required
  const Imagine = await client.Imagine(
    prompt,
    (uri: string, progress: string) => {
      console.log("Imagine.loading", uri, "progress", progress);
    }
  );

  if (!Imagine) {
    return;
  }
  // const reroll = await client.Reroll({
  //   msgId: <string>Imagine.id,
  //   hash: <string>Imagine.hash,
  //   flags: Imagine.flags,
  //   loading: (uri: string, progress: string) => {
  //     console.log("Reroll.loading", uri, "progress", progress);
  //   },
  // });

  // const Variation = await client.Variation({
  //   index: 2,
  //   msgId: <string>Imagine.id,
  //   hash: <string>Imagine.hash,
  //   flags: Imagine.flags,
  //   loading: (uri: string, progress: string) => {
  //     console.log("Variation.loading", uri, "progress", progress);
  //   },
  // });

  // if (!Variation) {
  //   return;
  // }
  // const Upscale = await client.Upscale({
  //   index: 2,
  //   msgId: <string>Variation.id,
  //   hash: <string>Variation.hash,
  //   flags: Variation.flags,
  //   loading: (uri: string, progress: string) => {
  //     console.log("Upscale.loading", uri, "progress", progress);
  //   },
  // });

  client.Close();
}

const animals = ["African Elephant", "Bengal Tiger", "Blue Whale", "Bald Eagle", "American Alligator", "Arctic Fox",
  "Giant Panda", "Koala", "King Cobra", "Emperor Penguin", "Siberian Husky", "Red Fox", "Grey Wolf",
  "Sea Otter", "Humpback Whale", "Golden Eagle", "Polar Bear", "Snow Leopard", "Black Widow Spider",
  "Great White Shark", "Hammerhead Shark", "Honey Bee", "Green Anaconda", "Cheetah", "Jaguar",
  "African Lion", "Sloth Bear", "Great Horned Owl", "Mountain Gorilla", "Green Sea Turtle",
  "Nile Crocodile", "Tasmanian Devil", "Raccoon", "Spotted Hyena", "Giraffe", "American Bison",
  "Bald Eagle", "Bottlenose Dolphin", "Red Kangaroo", "Arctic Hare", "Lynx", "Hippopotamus",
  "Komodo Dragon", "Ostrich", "Blue Macaw", "Mongoose", "Barn Owl", "Timber Wolf", "Chimpanzee",
  "Scorpion", "Walrus", "Armadillo", "Caracal", "Albatross", "Vampire Bat", "Snowy Owl",
  "Orangutan", "Bactrian Camel", "Quokka", "Poison Dart Frog", "Black Rhinoceros", "Atlantic Puffin",
  "Sea Urchin", "Meerkat", "Kangaroo Rat", "Hedgehog", "Aye-Aye", "Okapi", "Manatee", "Flying Squirrel",
  "Wombat", "Galapagos Tortoise", "European Badger", "Narwhal", "Lynx", "Sand Cat", "Clouded Leopard",
  "Golden Lion Tamarin", "Sea Lion", "Brown Bear", "Pufferfish", "Mule Deer", "Eurasian Lynx",
  "Greater Flamingo", "Capybara", "Starfish", "Pygmy Goat", "Koi Fish", "Bearded Dragon", "Mandarin Duck",
  "Bighorn Sheep", "Peacock", "Giant Anteater", "Clownfish", "Dugong", "Skunk", "Tree Frog",
  "Nile Monitor", "Yellowfin Tuna", "Bald Uakari"]

const prompts = animals.map(animal => 
  `a new creature that combined the strength of gene from zombie and ${animal} --seed 1591240234`
);

async function processPrompts() {
  for (const prompt of prompts.slice(0, 10)) { // Slice to only handle the first 10 as an example
      await main(prompt);
  }
}


processPrompts()
.then(() => {
  // console.log("finished");
  // process.exit(0);
})
.catch((err) => {
  console.log("finished");
  console.error(err);
  process.exit(1);
});


