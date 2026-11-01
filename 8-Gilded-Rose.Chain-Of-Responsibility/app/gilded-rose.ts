export class Item {
  constructor(
    public name: string,
    public sellIn: number,
    public quality: number
  ) {}
}
export class GildedRose {
  constructor(public items: Item[]) {}

  updateQuality(): void {
    for (const item of this.items) {
      if (item.name !== "Aged Brie" && item.name !== "Backstage passes") {
        if (item.quality > 0) {
          if (item.name !== "Sulfuras") {
            item.quality--;
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality++;

          if (item.name === "Backstage passes") {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality++;
              }
            }

            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality++;
              }
            }
          }
        }
      }

      if (item.name !== "Sulfuras") {
        item.sellIn--;
      }

      if (item.sellIn < 0) {
        if (item.name !== "Aged Brie") {
          if (item.name !== "Backstage passes") {
            if (item.quality > 0) {
              if (item.name !== "Sulfuras") {
                item.quality--;
              }
            }
          } else {
            item.quality = 0;
          }
        } else {
          if (item.quality < 50) {
            item.quality++;
          }
        }
      }
    }
  }
}
