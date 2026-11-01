import { GildedRose, Item } from "@/gilded-rose";
import { describe, expect, test } from "vitest";

describe("Gilded Rose - Chain of Responsibility", () => {
	describe("Golden Tests", () => {
		test("Golden test - 1 jour", () => {
			const testItems = [
				new Item("+5 Dexterity Vest", 10, 20),
				new Item("Aged Brie", 2, 0),
				new Item("Elixir of the Mongoose", 5, 7),
				new Item("Sulfuras, Hand of Ragnaros", 0, 80),
				new Item("Sulfuras, Hand of Ragnaros", -1, 80),
				new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
				new Item("Backstage passes to a TAFKAL80ETC concert", 10, 35),
				new Item("Backstage passes to a TAFKAL80ETC concert", 5, 40),
				new Item("Conjured Mana Cake", 3, 6),
			];
			const gildedRose = new GildedRose(testItems);

			gildedRose.updateQuality();

			expect(gildedRose.items).toMatchObject([
				{ name: "+5 Dexterity Vest", quality: 19, sellIn: 9 },
				{ name: "Aged Brie", quality: 1, sellIn: 1 },
				{ name: "Elixir of the Mongoose", quality: 6, sellIn: 4 },
				{ name: "Sulfuras, Hand of Ragnaros", quality: 80, sellIn: 0 },
				{ name: "Sulfuras, Hand of Ragnaros", quality: 80, sellIn: -1 },
				{ name: "Backstage passes to a TAFKAL80ETC concert", quality: 21, sellIn: 14 },
				{ name: "Backstage passes to a TAFKAL80ETC concert", quality: 37, sellIn: 9 },
				{ name: "Backstage passes to a TAFKAL80ETC concert", quality: 43, sellIn: 4 },
				{ name: "Conjured Mana Cake", quality: 4, sellIn: 2 },
			]);
		});
	});

	describe("Backstage passes", () => {
		test("quality increases by 1 when > 10 days", () => {
			const gildedRose = new GildedRose([
				new Item("Backstage passes to a TAFKAL80ETC concert", 15, 10),
			]);

			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(11);
			expect(gildedRose.items[0].sellIn).toBe(14);
		});

		test("quality increases by 2 when <= 10 days", () => {
			const gildedRose = new GildedRose([
				new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
			]);

			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(12);
			expect(gildedRose.items[0].sellIn).toBe(9);
		});

		test("quality increases by 3 when <= 5 days", () => {
			const gildedRose = new GildedRose([
				new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
			]);

			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(13);
			expect(gildedRose.items[0].sellIn).toBe(4);
		});

		test("quality capped at 50", () => {
			const gildedRose = new GildedRose([
				new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
			]);

			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(50);
		});

		test("quality drops to 0 after concert", () => {
			const gildedRose = new GildedRose([
				new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
			]);

			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(0);
			expect(gildedRose.items[0].sellIn).toBe(-1);
		});
	});

	describe("Aged Brie", () => {
		test("quality increases over time", () => {
			const gildedRose = new GildedRose([new Item("Aged Brie", 5, 10)]);

			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(11);
			expect(gildedRose.items[0].sellIn).toBe(4);
		});

		test("quality increases by 2 after expiration", () => {
			const gildedRose = new GildedRose([new Item("Aged Brie", 0, 10)]);

			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(12);
			expect(gildedRose.items[0].sellIn).toBe(-1);
		});

		test("quality capped at 50", () => {
			const gildedRose = new GildedRose([new Item("Aged Brie", -1, 49)]);

			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(50);
		});
	});

	describe("Sulfuras (legendary item)", () => {
		test("never changes quality or sellIn", () => {
			const gildedRose = new GildedRose([
				new Item("Sulfuras, Hand of Ragnaros", 5, 80),
			]);

			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(80);
			expect(gildedRose.items[0].sellIn).toBe(5);
		});

		test("works with short name", () => {
			const gildedRose = new GildedRose([new Item("Sulfuras", 5, 80)]);

			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(80);
			expect(gildedRose.items[0].sellIn).toBe(5);
		});

		test("works with sellIn already negative", () => {
			const gildedRose = new GildedRose([
				new Item("Sulfuras, Hand of Ragnaros", -1, 80),
			]);

			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(80);
			expect(gildedRose.items[0].sellIn).toBe(-1);
		});
	});

	describe("Normal items", () => {
		test("quality decreases by 1 before expiration", () => {
			const gildedRose = new GildedRose([
				new Item("+5 Dexterity Vest", 10, 20),
			]);

			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(19);
			expect(gildedRose.items[0].sellIn).toBe(9);
		});

		test("quality decreases by 2 after expiration", () => {
			const gildedRose = new GildedRose([
				new Item("+5 Dexterity Vest", 0, 10),
			]);

			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(8);
			expect(gildedRose.items[0].sellIn).toBe(-1);
		});

		test("quality never goes below 0", () => {
			const gildedRose = new GildedRose([
				new Item("+5 Dexterity Vest", 5, 0),
			]);

			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(0);
		});
	});

	describe("Conjured items", () => {
		test("quality decreases by 2 before expiration", () => {
			const gildedRose = new GildedRose([
				new Item("Conjured Mana Cake", 10, 20),
			]);

			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(18);
			expect(gildedRose.items[0].sellIn).toBe(9);
		});

		test("quality decreases by 4 after expiration", () => {
			const gildedRose = new GildedRose([
				new Item("Conjured Mana Cake", 0, 10),
			]);

			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(6);
			expect(gildedRose.items[0].sellIn).toBe(-1);
		});

		test("quality never goes below 0", () => {
			const gildedRose = new GildedRose([
				new Item("Conjured Mana Cake", 0, 3),
			]);

			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(0);
		});
	});
});
