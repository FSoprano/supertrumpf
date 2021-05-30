export default class Animal {
    static properties = {
      size: { label: 'Größe', unit: 'm' },
      weight: { label: 'Gewicht', unit: 'kg' },
      age: { label: 'Alter', unit: 'Jahre' },
      offspring: { label: 'Nachkommen', unit: '' },
      speed: { label: 'Geschwindigkeit', unit: 'km/h' },
    }

    constructor(name, image, size, weight, age, offspring, speed) {
      this.name = name;
      this.image = image;
      this.size = size;
      this.weight = weight;
      this.age = age;
      this.offspring = offspring;
      this.speed = speed;
    }
}
