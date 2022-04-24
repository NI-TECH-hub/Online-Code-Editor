import React, { Component } from "react";
import "./Compiler.css";
import Questions from "../Question/Question";

class MyCompiler extends Component {
  state = {
    input: localStorage.getItem("input") || ``,
    output: ``,
    language_id: localStorage.getItem("language_Id") || 2,
    user_input: ``,
    userInput: false,
  };

  
  input = (event) => {
    event.preventDefault();

    this.setState({ input: event.target.value });
    localStorage.setItem("input", event.target.value);
  };
  userInput = (event) => {
    event.preventDefault();
    this.setState({ user_input: event.target.value });
  };
  language = (event) => {
    event.preventDefault();

    this.setState({ language_id: event.target.value });
    localStorage.setItem("language_Id", event.target.value);
  };

  showUserInputHandler = (event) => {
    console.log(this.userInput);
    if (this.state.userInput === true) {
      this.setState({ userInput: false });
    } else {
      this.setState({ userInput: true });
    }
  };

  

  submit = async (e) => {
    e.preventDefault();

    let outputText = document.getElementById("output");
    outputText.innerHTML = "";
    outputText.innerHTML += "Creating Submission ...\n";
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions",
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key":
            "50aacb5786mshcf40dd85e274ccfp1d1e4cjsn5cf9c5fba80e",
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          source_code: this.state.input,
          stdin: this.state.user_input,
          language_id: this.state.language_id,
        }),
      }
    );
    outputText.innerHTML += "Submission Created ...\n";
    const jsonResponse = await response.json();

    let jsonGetSolution = {
      status: { description: "Queue" },
      stderr: null,
      compile_output: null,
    };

    while (
      jsonGetSolution.status.description !== "Accepted" &&
      jsonGetSolution.stderr == null &&
      jsonGetSolution.compile_output == null
    ) {
      outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
      if (jsonResponse.token) {
        let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;

        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key":
              "50aacb5786mshcf40dd85e274ccfp1d1e4cjsn5cf9c5fba80e",
            "content-type": "application/json",
          },
        });

        jsonGetSolution = await getSolution.json();
      }
    }
    if (jsonGetSolution.stdout) {
      const output = atob(jsonGetSolution.stdout);

      outputText.innerHTML = "";

      outputText.innerHTML += `Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
    } else if (jsonGetSolution.stderr) {
      const error = atob(jsonGetSolution.stderr);

      outputText.innerHTML = "";

      outputText.innerHTML += `\n Error :${error}`;
    } else {
      const compilation_error = atob(jsonGetSolution.compile_output);

      outputText.innerHTML = "";

      outputText.innerHTML += `\n Error :${compilation_error}`;
    }
  };
  render() {
    return (

      
      <div class="editor__box">
        <div class="question">
         <Questions />
        </div>
        <div class="user__view">
          <div class="editor">
            {/* langugaes */}
            <label htmlFor="tags" className="mr-1">
              <b className="heading">Language:</b>
            </label>
            <select
              value={this.state.language_id}
              onChange={this.language}
              id="tags"
              className="form-control form-inline mb-2 language"
            >
              <option value="54">C++</option>
              <option value="50">C</option>
              <option value="62">Java</option>
              <option value="71">Python</option>
            </select>
            {/* languages end */}

            {/* code input start */}
            <label htmlFor="solution ">
              <span className="badge badge-info heading mt-2 ">
                <i className="fas fa-code fa-fw fa-lg"></i> Code Here
              </span>
            </label>
            <textarea
              required
              name="solution"
              id="source"
              onChange={this.input}
              className=" source"
              value={this.state.input}
            ></textarea>
          </div>

          {/* code input end */}

          {/* run button */}
          <button
            type="submit"
            className="btn btn-danger ml-2 mr-2 "
            onClick={this.submit}
          >
            <i className="fas fa-cog fa-fw"></i> Run
          </button>
          <br></br>
          {/* run button end */}

          {/* output section start */}
          <div class="output">
            <span className="badge badge-info heading my-2 ">
              <i className="fas fa-exclamation fa-fw fa-md"></i> Output
            </span>
            <textarea name="codeeditor" id="output"></textarea>
          </div>
          {/* output section end */}

          {/* custom input */}
          <input type="checkbox" onClick={this.showUserInputHandler} /> Custom
          input
          {this.state.userInput && (
            <div class="user__input">
              <span className="badge badge-primary heading my-2 ">
                <i className="fas fa-user fa-fw fa-md"></i> User Input
              </span>
              <br />
              <textarea
                name="codeeditor"
                id="input"
                onChange={this.userInput}
              ></textarea>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MyCompiler;
