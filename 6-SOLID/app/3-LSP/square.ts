/**
 * Rectangle représente une forme dont la largeur et la hauteur
 * sont indépendantes.
 */
class Rectangle {
  protected width: number = 0;
  protected height: number = 0;

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

/**
 * Square hérite de Rectangle en supposant que
 * "un carré est un rectangle".
 *
 * PROBLÈME :
 * Un carré impose une contrainte supplémentaire :
 * width === height
 *
 * Cette contrainte n'existe PAS dans Rectangle.
 */
class Square extends Rectangle {
  /**
   * Pour garantir width === height,
   * on est obligé de modifier la hauteur
   * quand la largeur change.
   *
   * => On casse le contrat implicite de Rectangle.
   */
  setWidth(width: number) {
    this.width = width;
    this.height = width;
  }

  setHeight(height: number) {
    this.width = height;
    this.height = height;
  }
}

/**
 * Le Liskov Substitution Principle dit que :
 *
 * "Une instance d'une classe dérivée doit pouvoir
 * être utilisée partout où sa classe mère est attendue,
 * sans modifier le comportement du programme."
 *
 * Ici :
 * - Rectangle permet de modifier largeur et hauteur indépendamment
 * - Square empêche cette indépendance
 *
 * => Square renforce les invariants
 * => Square n'est PAS substituable à Rectangle
 *
 * => Violation du LSP
 */

function draw(rect: Rectangle) {
  rect.setWidth(10);
  rect.setHeight(20);
  console.log(`Area: ${rect.getArea()}`); // Attendu : 200
}

const myRect = new Rectangle();
draw(myRect); // Area: 200

const mySquare = new Square();
draw(mySquare); // Area: 400 (???) Violation du LSP
