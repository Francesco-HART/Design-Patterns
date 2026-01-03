It started with a simple SimUDuck app

Joe works for a company that makes a highly successful duck pond
simulation game, SimUDuck. The game can show a large variety of
duck species swimming and making quacking sounds. The initial
designers of the system used standard OO techniques and created
one Duck superclass from which all other duck types inherit.

But now we need the ducks to FLY

Joe failed to notice that not all
subclasses of Duck should fly. When
Joe added new behavior to the
Duck superclass, he was also adding
behavior that was not appropriate
for some Duck subclasses. He now
has flying inanimate objects in the
SimUDuck program.
