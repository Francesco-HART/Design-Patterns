export interface FilterStrategy {
  removeValue(data: number): boolean;
}

class RemoveNegativeNumbers implements FilterStrategy {
  removeValue(data: number): boolean {
    return data < 0;
  }
}

class RemoveEvenNumbers implements FilterStrategy {
  removeValue(data: number): boolean {
    return data % 2 === 0;
  }
}

class DataFilter {
  private strategy: FilterStrategy;

  constructor(strategy: FilterStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: FilterStrategy) {
    this.strategy = strategy;
  }

  filterData(data: number[]): number[] {
    return data.filter((value) => !this.strategy.removeValue(value));
  }
}

// Example usage:
const data = [1, -2, 3, 4, -5, 6];

const negativeFilter = new DataFilter(new RemoveNegativeNumbers());
console.log(negativeFilter.filterData(data)); // Output: [1, 3, 4, 6]

const evenFilter = new DataFilter(new RemoveEvenNumbers());
console.log(evenFilter.filterData(data)); // Output: [1, -2, 3, -5]
