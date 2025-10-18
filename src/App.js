import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [datetime, setDatetime] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);

  // Fetch all transactions from backend
  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + '/transaction';
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(ev) {
    ev.preventDefault();

    if (!name || !description || !datetime) {
      alert('Please fill all fields!');
      return;
    }

    const url = process.env.REACT_APP_API_URL + '/transaction';

    // Extract price from the input, e.g. "+200 new TV"
    const priceMatch = name.match(/^[+-]?\d+/);
    const price = priceMatch ? parseFloat(priceMatch[0]) : 0;
    const itemName = priceMatch ? name.substring(priceMatch[0].length).trim() : name;

    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ price, name: itemName, description, datetime }),
    })
      .then(res => res.json())
      .then(json => {
        console.log('Transaction saved:', json);
        // Clear the form
        setName('');
        setDatetime('');
        setDescription('');
        // Refresh transactions
        getTransactions().then(setTransactions);
      })
      .catch(err => console.error(err));
  }

  // Calculate balance
  let balance = transactions.reduce((sum, t) => sum + t.price, 0);
  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];

  return (
    <div>
      <main>
        <h1>${balance}<span>.{fraction}</span></h1>

        <form onSubmit={addNewTransaction}>
          <div className="basic">
            <input
              type="text"
              value={name}
              onChange={ev => setName(ev.target.value)}
              placeholder={'+200 new Samsung TV'}
            />
            <input
              type="datetime-local"
              value={datetime}
              onChange={ev => setDatetime(ev.target.value)}
            />
          </div>

          <div className="description">
            <input
              type="text"
              value={description}
              onChange={ev => setDescription(ev.target.value)}
              placeholder="description"
            />
          </div>

          <button type="submit">Add new transaction</button>
        </form>

        <div className="transactions">
          {transactions.length > 0 && transactions.map(transaction => (
            <div className="transaction" key={transaction._id}>
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="description">{transaction.description}</div>
              </div>
              <div className="right">
                <div className={"price " + (transaction.price < 0 ? 'red' : 'green')}>
                  {transaction.price < 0 ? '-' : '+'}${Math.abs(transaction.price)}
                </div>
                <div className="datetime">
                  {new Date(transaction.datetime).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
