### Javascript 面向对象编程（一）：封装

主要介绍如何"封装"数据和方法，以及如何从原型对象生成实例。

参考：http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html

#### 1）构造函数模式

为了解决从原型对象生成实例的问题，Javascript提供了一个构造函数（Constructor）模式。

所谓 "构造函数"，其实就是一个普通函数，但是内部使用了 <font color="#ff502c">this变量</font>。对构造函数使用 <font color="#ff502c">new运算符</font> ，就能<font color="#ff502c">生成实例</font>，并且this变量会绑定在实例对象上。

- 1、原型对象：
```js
　　function Cat(name,color){

　　　　this.name = name;
　　　　this.color = color;
　　　　this.type = "猫科动物";
　　　　this.eat = function(){alert("吃老鼠");};

　　}
```

- 2、生成实例对象：
```js
　　var cat1 = new Cat("大毛","黄色");
　　var cat2 = new Cat("二毛","黑色");

　　alert(cat1.name); // 大毛
　　alert(cat1.color); // 黄色

    // 这时cat1和cat2会自动含有一个constructor属性，指向它们的构造函数。
    alert(cat1 instanceof Cat); //true
    alert(cat2 instanceof Cat); //true
```

**问题：** 那就是对于每一个实例对象，type属性和eat()方法都是一模一样的内容，每一次生成一个实例，都必须为重复的内容，多占用一些内存。这样既不环保，也缺乏效率。

**改进：** Prototype模式

主要介绍的是，对象之间的 "继承" 的五种方法。

#### 2）Prototype 模式

Javascript规定，<font color="#ff502c">每一个构造函数</font>都有一个 <font color="#ff502c">prototype属性</font>，指向另一个对象。这个对象的所有属性和方法，都会被<font color="#ff502c">构造函数的实例继承</font>。

- 1、这意味着，我们可以把那些不变的属性和方法，直接定义在prototype对象上。

```js
　　function Cat(name,color){
　　　　this.name = name;
　　　　this.color = color;
　　}
    // 原型
　　Cat.prototype.type = "猫科动物";
　　Cat.prototype.eat = function(){alert("吃老鼠")};
```

- 2、生成实例对象：
```js
　　var cat1 = new Cat("大毛","黄色");
　　var cat2 = new Cat("二毛","黑色");

　　alert(cat1.type);   // 猫科动物
　　cat1.eat();         // 吃老鼠
```

这时所有实例的 type属性和eat()方法，其实都是同一个内存地址，<font color="#ff502c">指向prototype对象</font>，因此就提高了运行效率。

---

### Javascript面向对象编程（二）：构造函数的继承

参考：http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html

```js
    // 猫"对象的构造函数。
　　function Cat(name,color){

　　　　this.name = name;
　　　　this.color = color;
　　},

    // "动物"对象的构造函数。
　　function Animal(){

　　　　this.species = "动物";
　　}
```

怎样才能使 "猫" 继承 "动物" 呢？

#### 2）使用prototype模式

如果"猫"的 prototype对象，指向一个 Animal的实例，那么所有"猫"的实例，就能 <font color="#ff502c">继承Animal了</font>。

```js

　　Cat.prototype = new Animal();
　　Cat.prototype.constructor = Cat;

　　var cat1 = new Cat("大毛","黄色");
　　alert(cat1.species); // 动物
```

- 1、代码的第一行，我们将 Cat的prototype对象 <font color="#ff502c">指向</font>一个Animal的实例。 它相当于 **完全删除了** prototype 对象原先的值

如果替换了prototype对象，就**必须**要有第二步 -为新的prototype对象加上constructor属性；

```js
    Cat.prototype = new Animal();
```

- 2、任何一个 prototype对象 都有一个 constructor属性，指向它的构造函数。

1）如果没有"Cat.prototype = new Animal();"这一行，Cat.prototype.constructor 是指向 Cat的；

2）加了这一行以后，Cat.prototype.constructor 指向 Animal了；

```js
    Cat.prototype.constructor = Cat;

    alert(Cat.prototype.constructor == Animal); //true
```

更重要的是，每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性。

---

#### 3） 直接继承 prototype

可以让Cat()跳过 Animal()，直接继承Animal.prototype。