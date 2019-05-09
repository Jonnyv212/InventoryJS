// testFunc() {
//   return (
//     <div>
//       <h2>Test</h2>
//     </div>
//   );
// }
// // this.displayResults("/api/getInventory")
// render() {
//   return (
//     <div className="App">
//       <h1>Inventory</h1>
//       <Button
//         type="primary"
//         onClick={() => this.displayResults("/api/getProjects")}
//       >
//         Push me 1
//       </Button>
//       <button onClick={() => this.displayResults("/api/getInventory")}>
//         Push me 2
//       </button>

//       {this.state.data.length ? (
//         <table>
//           <thead>
//             <tr>
//               {Object.keys(this.state.data[0]).map(id => {
//                 return <th>{id}</th>;
//               })}
//             </tr>
//           </thead>
//           <tbody>
//             {this.state.data.map(items => {
//               return (
//                 <tr>
//                   {Object.keys(items).map(id => {
//                     return <td>{items[id]}</td>;
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       ) : null}

//     </div>
//   );
// }

// displayResults(path, stateKey = "data") {
//   axios.get(path).then(response => {
//     this.setState({ [stateKey]: response.data });
//   });
//   console.log(this.state.data);
// }

// toggle = () => {
//   this.setState({
//     collapsed: !this.state.collapsed,
//     data: "state.data after toggle"
//   });
// };

// foo() {
//   const numbers = [1, -1, 2, 3];

//   const items = numbers
//     .filter(n => n >= 0) // Filter numbers in array (numbers) greater than 0. [1, 2, 3]
//     .map(n => ({ value: n })) // Map each number in the array into objects. {value: 1}, {value: 2}, {value: 3}
//     .filter(obj => obj.value > 1) // Filter the objects by grabbing values(in the value: property) greater than 1. {value: 2}, {value: 3}
//     .map(obj => obj.value); // Map each object in the value property into an array. [2, 3]

//   return console.log(items);
// }

// foo2(value, num) {
//   const getNum = num + this.state.count; // increment by num
//   this.setState({
//     data: value,
//     count: getNum
//   });
// }
