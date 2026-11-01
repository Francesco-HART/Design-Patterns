export class Item {
	constructor(
		public name: string,
		public sellIn: number,
		public quality: number
	) {}
}

export interface ItemHandler {
	setNext(handler: ItemHandler): ItemHandler;
	handle(item: Item): void;
}

export abstract class AbstractItemHandler implements ItemHandler {
	private next?: ItemHandler;

	setNext(handler: ItemHandler): ItemHandler {
		this.next = handler;
		return handler;
	}

	handle(item: Item): void {
		if (this.canHandle(item)) {
			this.process(item);
		} else if (this.next) {
			this.next.handle(item);
		}
	}

	protected abstract canHandle(item: Item): boolean;
	protected abstract process(item: Item): void;
}

export class AgedBrieHandler extends AbstractItemHandler {
	protected canHandle(item: Item): boolean {
		return item.name === "Aged Brie";
	}

	protected process(item: Item): void {
		item.sellIn--;

		if (item.quality < 50) {
			item.quality++;
		}

		if (item.sellIn < 0 && item.quality < 50) {
			item.quality++;
		}
	}
}

export class BackstagePassHandler extends AbstractItemHandler {
	protected canHandle(item: Item): boolean {
		return item.name.startsWith("Backstage passes");
	}

	protected process(item: Item): void {
		item.sellIn--;

		if (item.sellIn < 0) {
			item.quality = 0;
			return;
		}

		item.quality += item.sellIn < 5 ? 3 : item.sellIn < 10 ? 2 : 1;
		item.quality = Math.min(item.quality, 50);
	}
}

export class SulfurasHandler extends AbstractItemHandler {
	protected canHandle(item: Item): boolean {
		return item.name.startsWith("Sulfuras");
	}

	protected process(_: Item): void {
		// Sulfuras ne change jamais - c'est un objet légendaire
	}
}

export class ConjuredHandler extends AbstractItemHandler {
	protected canHandle(item: Item): boolean {
		return item.name.startsWith("Conjured");
	}

	protected process(item: Item): void {
		item.sellIn--;

		// Les items Conjured se dégradent 2x plus vite
		item.quality -= 2;

		if (item.sellIn < 0) {
			item.quality -= 2;
		}

		item.quality = Math.max(item.quality, 0);
	}
}

export class DefaultItemHandler extends AbstractItemHandler {
	protected canHandle(): boolean {
		return true; // dernier maillon de la chaîne
	}

	protected process(item: Item): void {
		item.sellIn--;
		item.quality--;

		if (item.sellIn < 0) {
			item.quality--;
		}

		item.quality = Math.max(item.quality, 0);
	}
}

export class ItemHandlerChain {
	static build(): ItemHandler {
		const agedBrie = new AgedBrieHandler();
		const backstage = new BackstagePassHandler();
		const sulfuras = new SulfurasHandler();
		const conjured = new ConjuredHandler();
		const defaultHandler = new DefaultItemHandler();

		agedBrie
			.setNext(backstage)
			.setNext(sulfuras)
			.setNext(conjured)
			.setNext(defaultHandler);

		return agedBrie;
	}
}

export class GildedRose {
	private handler = ItemHandlerChain.build();

	constructor(public items: Item[]) {}

	updateQuality(): void {
		for (const item of this.items) {
			this.handler.handle(item);
		}
	}
}
