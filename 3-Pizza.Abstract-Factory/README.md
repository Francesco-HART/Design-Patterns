Looking at object dependencies

When you directly instantiate an object, you are depending on its
concrete class. Take a look at our very dependent PizzaStore one
page back. It creates all the pizza objects right in the PizzaStore class
instead of delegating to a factory.
If we draw a diagram representing that version of the PizzaStore
and all the objects it depends on, here’s what it looks like:

Now, the main problem with the very dependent PizzaStore is that it depends
on every type of pizza because it actually instantiates concrete types in its
orderPizza() method.
While we’ve created an abstraction, Pizza, we’re nevertheless creating concrete
Pizzas in this code, so we don’t get a lot of leverage out of this abstraction.
How can we get those instantiations out of the orderPizza() method? Well, as we
know, the Factory Method Pattern allows us to do just that.
So, after we’ve applied the Factory Method Pattern, our diagram looks like this:

The design for the Pizza Store is really shaping up: it’s got a
flexible framework and it does a good job of adhering to design
principles.
Now, the key to Objectville Pizza’s success has always been fresh,
quality ingredients, and what you’ve discovered is that with the
new framework your franchises have been following your procedures,
but a few franchises have been substituting inferior ingredients in
their pizzas to lower costs and increase their margins. You know
you’ve got to do something, because in the long term this is going
to hurt the Objectville brand!

So how are you going to ensure each franchise is using quality ingredients?
You’re going to build a factory that produces them and ships them to your
franchises!
Now there’s only one problem with this plan: the franchises are located in
different regions and what is red sauce in New York is not red sauce in Chicago.
So, you have one set of ingredients that needs to be shipped to New York and a
different set that needs to be shipped to Chicago. Let’s take a closer look:

New York uses one set of ingredients and
Chicago another. Given the popularity of
Objectville Pizza, it won’t be long before
you also need to ship another set of regional
ingredients to California, and what’s next?
Austin?
For this to work, you’re going to have to figure
out how to handle families of ingredients.
