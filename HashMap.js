function hashMap() {
  const LoadFactor = 0.75;
  let buckets = Array.from({ length: 16 }, () => []);
  let size = 0;

  this.hash = function (key) {
    let hashCode = 0;
    let primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode += hashCode * primeNumber + key.charCodeAt(i);
    }

    return hashCode % buckets.length;
  };

  this.resize = function () {
    const oldBuckets = buckets;
    const oldBucketLength = buckets.length;
    buckets = Array.from({ length: oldBucketLength * 2 }, () => []);
    size = 0;

    for (let bucket of oldBuckets) {
      for (let [key, value] of bucket) {
        this.set(key, value); // re-insert into new resized bucket
      }
    }
  };


  // set key value in the bucket

  this.set = function (key, value) {
    let index = this.hash(key);
    const bucket = buckets[index];

    for (let pair of bucket) {
      //update the new value
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    // add the new key pair value
    bucket.push([key, value]);
    size += 1;

    if (size / buckets.length > LoadFactor) {
        console.log('The current Bucket has crossed the Threshold!! Time to Resize and Rehash!')
      this.resize();
    }
  };

  // get value from the bucket

  this.get = function (key) {
    let index = this.hash(key);

    const bucket = buckets[index];

    for (let pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }

    return -1;
  };

  // check key is in the hash map

  this.has = function (key) {
    let index = this.hash(key);

    // take the particular bucket
    const bucket = buckets[index];

    // iterate throught the current bucket
    for (let pair of bucket) {
      if (pair[0] === key) {
        return true;
      }
    }

    return false;
  };

  // remove the key from the hash map
  this.remove = function (key) {
    let index = this.hash(key);

    const bucket = buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        size -= 1;
        return true;
      }
    }

    return false;
  };

  // return the length of current entries
  this.getLength = function () {
    return size;
  };

  // return the keys
  this.getKeys = function () {
    let currKeys = [];

    for (let bucket of buckets) {
      for (let [key] of bucket) {
        currKeys.push(key);
      }
    }

    return currKeys;
  };

  // return the values
  this.getValues = function () {
    let currValues = [];

    for (let bucket of buckets) {
      for (let [_, value] of bucket) {
        currValues.push(value);
      }
    }

    return currValues;
  };

  this.getEntries = function () {
    let currEntries = [];

    for (let bucket of buckets) {
      for (let [key, value] of bucket) {
        if ((key !== "") & (value !== "")) {
          currEntries.push([key, value]);
        }
      }
    }

    return currEntries;
  };

  // clear all enteries
  this.clear = function () {
    for (let i = 0; i < buckets.length; i++) {
      buckets[i] = [];
    }
    size = 0;
    return true;
  };

  //display the buckets

  this.getBuckets = function () {
    for (let bucket of buckets) {
      console.log(bucket);
    }
  };
}

let test = new hashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set('monkey','brown')
test.getBuckets();
console.log(test.getLength());
