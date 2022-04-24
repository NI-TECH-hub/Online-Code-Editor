import React from "react";
import "./Question.css"

const Questions = () => {
  return (
    <div>
      <h3>Two Sum</h3>
      <p>
        1.Given an array of integers nums and an integer target, return indices
        of the two numbers such that they add up to target. You may assume that
        each input would have exactly one solution, and you may not use the same
        element twice. You can return the answer in any order.
      </p>
      <p>
        <strong>Example 1:</strong>
      </p>
      <p className="example">
        <strong>Input:</strong> nums = [2,7,11,15], target = 9
        <br />
        <strong>Output:</strong> [0,1]
        <br />
        <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return
        [0, 1].
      </p>

      <p>
        <strong>Example 2:</strong>
      </p>
      <p className="example">
        <strong>Input:</strong> nums = [3,2,4], target = 6
        <br />
        <strong>Output:</strong> [1,2]
      </p>

        <p><strong>constrains:</strong></p>
      <ul className="constrains">
        <li>
          <code>
            2 &lt;= nums.length &lt;= 10<sup>4</sup>
          </code>
        </li>
        <li>
          <code>
            -10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup>
          </code>
        </li>
        <li>
          <code>
            -10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup>
          </code>
        </li>
        <li>
          <strong>Only one valid answer exists.</strong>
        </li>
      </ul>
    </div>
  );
};

export default Questions;
