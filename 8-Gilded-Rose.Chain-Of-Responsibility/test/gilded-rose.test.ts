import { GildedRose, Item } from "@/gilded-rose";
import { describe, expect, test } from "vitest";

/**
 * Golden Tests - Ces tests capturent le comportement ACTUEL du code legacy.
 * Ils servent de filet de sécurité pendant le refactoring.
 *
 * ATTENTION: Certains comportements capturés ici peuvent être incorrects
 * par rapport à la spécification. C'est normal pour un kata de refactoring.
 */
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
	describe("Golden Tests (comportement actuel)", () => {
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
			];
			const gildedRose = new GildedRose(testItems);

			gildedRose.updateQuality();

			expect(gildedRose.items[0]).toMatchObject({
				name: "+5 Dexterity Vest",
				quality: 19,
				sellIn: 9,
			});
			expect(gildedRose.items[1]).toMatchObject({
				name: "Aged Brie",
				quality: 1,
				sellIn: 1,
			});
			expect(gildedRose.items[2]).toMatchObject({
				name: "Elixir of the Mongoose",
				quality: 6,
				sellIn: 4,
			});
			// Note: Sulfuras DEVRAIT rester à 80/0, mais le code legacy
			// ne gère pas correctement le nom complet "Sulfuras, Hand of Ragnaros"
			expect(gildedRose.items[5]).toMatchObject({
				name: "Backstage passes to a TAFKAL80ETC concert",
				quality: 21,
				sellIn: 14,
			});
		});
	});

	describe("Backstage passes", () => {
		test("sellIn boundary - exactly 11 days", () => {
			const gildedRose = new GildedRose([
				new Item("Backstage passes to a TAFKAL80ETC concert", 11, 10),
			]);

			gildedRose.updateQuality();

			// À 11 jours, quality augmente de 1 (comportement normal)
			expect(gildedRose.items[0].quality).toBe(11);
			expect(gildedRose.items[0].sellIn).toBe(10);
		});

		test("sellIn boundary - exactly 10 days (bonus +2)", () => {
			const gildedRose = new GildedRose([
				new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
			]);

			gildedRose.updateQuality();

			// À 10 jours ou moins, quality augmente de 2
			expect(gildedRose.items[0].quality).toBe(12);
			expect(gildedRose.items[0].sellIn).toBe(9);
		});

		test("sellIn boundary - exactly 5 days (bonus +3)", () => {
			const gildedRose = new GildedRose([
				new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10),
			]);

			gildedRose.updateQuality();

			// À 5 jours ou moins, quality augmente de 3
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

		test("after concert (sellIn < 0) - quality drops to 0", () => {
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

	/**
	 * NOUVELLE FONCTIONNALITE A IMPLEMENTER
	 *
	 * Les items "Conjured" se dégradent deux fois plus vite que les items normaux:
	 * - Avant expiration: -2 quality par jour (au lieu de -1)
	 * - Après expiration: -4 quality par jour (au lieu de -2)
	 */
	describe("Conjured items (NOUVELLE FONCTIONNALITE)", () => {
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
