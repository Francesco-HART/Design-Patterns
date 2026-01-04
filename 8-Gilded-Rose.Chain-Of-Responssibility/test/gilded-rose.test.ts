import { GildedRose, Item } from "@/gilded-rose";
import { describe, expect, test } from "vitest";

const items = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 35),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 40),
];

describe("Gilded Rose", () => {
  test("Golden test", () => {
    const gildedRose = new GildedRose(items);

    gildedRose.updateQuality();

    expect(gildedRose.items).toMatchObject([
      {
        name: "+5 Dexterity Vest",
        quality: 19,
        sellIn: 9,
      },
      {
        name: "Aged Brie",
        quality: 1,
        sellIn: 1,
      },
      {
        name: "Elixir of the Mongoose",
        quality: 6,
        sellIn: 4,
      },
      {
        name: "Sulfuras, Hand of Ragnaros",
        quality: 78,
        sellIn: -1,
      },
      {
        name: "Sulfuras, Hand of Ragnaros",
        quality: 78,
        sellIn: -2,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 19,
        sellIn: 14,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 34,
        sellIn: 9,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 39,
        sellIn: 4,
      },
    ]);
  });

  test("Golden test many days", () => {
    const gildedRose = new GildedRose(items);

    for (let i = 0; i < 100; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items).toMatchObject([
      {
        name: "+5 Dexterity Vest",
        quality: 0,
        sellIn: -91,
      },
      {
        name: "Aged Brie",
        quality: 50,
        sellIn: -99,
      },
      {
        name: "Elixir of the Mongoose",
        quality: 0,
        sellIn: -96,
      },
      {
        name: "Sulfuras, Hand of Ragnaros",
        quality: 0,
        sellIn: -101,
      },
      {
        name: "Sulfuras, Hand of Ragnaros",
        quality: 0,
        sellIn: -102,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 0,
        sellIn: -86,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 0,
        sellIn: -91,
      },
      {
        name: "Backstage passes to a TAFKAL80ETC concert",
        quality: 0,
        sellIn: -96,
      },
    ]);
  });

  test("Backstage passes sellIn boundary - exactly 11 days", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10),
    ]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(9);
    expect(gildedRose.items[0].sellIn).toBe(10);
  });

  test("Backstage passes sellIn boundary - exactly 6 days", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10),
    ]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(9);
    expect(gildedRose.items[0].sellIn).toBe(5);
  });

  test("sellIn boundary - exactly 0 days", () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 0, 10)]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(8);
    expect(gildedRose.items[0].sellIn).toBe(-1);
  });

  test("Backstage passes - différence entre sellIn 11 et 12", () => {
    const items11 = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 12, 10),
    ]);
    const items12 = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10),
    ]);

    items11.updateQuality();
    items12.updateQuality();

    expect(items11.items[0].quality).toBe(9);
    expect(items12.items[0].quality).toBe(9);
  });

  test("Backstage passes - différence entre sellIn 6 et 7", () => {
    const items6 = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 7, 10),
    ]);
    const items7 = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 6, 10),
    ]);

    items6.updateQuality();
    items7.updateQuality();

    expect(items6.items[0].quality).toBe(9);
    expect(items7.items[0].quality).toBe(9);
  });

  test("Item expiration - différence entre sellIn 0 et 1", () => {
    const item0 = new GildedRose([new Item("+5 Dexterity Vest", 1, 10)]);
    const item1 = new GildedRose([new Item("+5 Dexterity Vest", 0, 10)]);

    item0.updateQuality();
    item1.updateQuality();

    expect(item0.items[0].quality).toBe(9);
    expect(item1.items[0].quality).toBe(8);
  });

  test("Backstage passes - quality near max (50) with sellIn < 11", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes", 10, 49),
    ]);

    gildedRose.updateQuality();

    // Quality should increase by 2 (base +1, +1 for sellIn < 11) but capped at 50
    expect(gildedRose.items[0].quality).toBe(50);
    expect(gildedRose.items[0].sellIn).toBe(9);
  });

  test("Backstage passes - quality near max (50) with sellIn < 6", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes", 5, 49),
    ]);

    gildedRose.updateQuality();

    // Quality should increase by 3 (base +1, +1 for sellIn < 11, +1 for sellIn < 6) but capped at 50
    expect(gildedRose.items[0].quality).toBe(50);
    expect(gildedRose.items[0].sellIn).toBe(4);
  });

  test("Backstage passes - quality at max (50) with sellIn < 11", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes", 10, 50),
    ]);

    gildedRose.updateQuality();

    // Quality should stay at 50
    expect(gildedRose.items[0].quality).toBe(50);
    expect(gildedRose.items[0].sellIn).toBe(9);
  });

  test("Backstage passes - after concert (sellIn < 0)", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes", 0, 20),
    ]);

    gildedRose.updateQuality();

    // After concert, quality drops to 0
    expect(gildedRose.items[0].quality).toBe(0);
    expect(gildedRose.items[0].sellIn).toBe(-1);
  });

  test("Backstage passes - concert passed (sellIn already negative)", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes", -1, 30),
    ]);

    gildedRose.updateQuality();

    // Quality should be 0 after concert
    expect(gildedRose.items[0].quality).toBe(0);
    expect(gildedRose.items[0].sellIn).toBe(-2);
  });

  test("Aged Brie - quality increases after sellIn expires", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 10)]);

    gildedRose.updateQuality();

    // Aged Brie increases by 2 after expiration (1 normal + 1 bonus)
    expect(gildedRose.items[0].quality).toBe(12);
    expect(gildedRose.items[0].sellIn).toBe(-1);
  });

  test("Aged Brie - quality near max (50) after expiration", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", -1, 49)]);

    gildedRose.updateQuality();

    // Should increase by 2 but cap at 50
    expect(gildedRose.items[0].quality).toBe(50);
    expect(gildedRose.items[0].sellIn).toBe(-2);
  });

  test("Sulfuras - never changes quality or sellIn", () => {
    const gildedRose = new GildedRose([new Item("Sulfuras", 5, 80)]);

    gildedRose.updateQuality();

    // Sulfuras never changes
    expect(gildedRose.items[0].quality).toBe(80);
    expect(gildedRose.items[0].sellIn).toBe(5);
  });

  test("Normal item - quality decreases twice after expiration", () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", -1, 10)]);

    gildedRose.updateQuality();

    // Normal item decreases by 2 after expiration
    expect(gildedRose.items[0].quality).toBe(8);
    expect(gildedRose.items[0].sellIn).toBe(-2);
  });

  test("Normal item - quality never goes below 0", () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 5, 0)]);

    gildedRose.updateQuality();

    expect(gildedRose.items[0].quality).toBe(0);
    expect(gildedRose.items[0].sellIn).toBe(4);
  });
});
