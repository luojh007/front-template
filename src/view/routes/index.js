import React, { Component } from 'react'
/**
 * @param {number} x
 * @return {number}
 */
var isPalindrome = function (x) {
  if (x < 0) {
      return false
  }
  let res = 0;
  while (x !== 0) {
      res = res * 10 + x % 10
      x = ~~(x / 10);
  }
  if (res == x) {
      return true;
  } else {
      return false;
  }
};
console.log(isPalindrome(121))

export default class index extends Component {
  render() {
    return (
      <div>
        前端自动化构建
      </div>
    )
  }
}
