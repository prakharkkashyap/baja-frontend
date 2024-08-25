import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  // Set the document title to your roll number
  useEffect(() => {
    document.title = '21BCI0246';
  }, []);

  const options = [
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Highest Lowercase Alphabet', label: 'Highest Lowercase Alphabet' },
  ];

  const handleSubmit = async () => {
    try {
      // Validate JSON input
      const parsedJson = JSON.parse(jsonInput);

      // Call the backend API
      const res = await axios.post('https://bajaj-finserv-backend-phi.vercel.app/bfhl', parsedJson);
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input');
      setResponse(null);
      console.log(err);
    }
  };

  const handleMultiSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;

    const { alphabets, numbers, highest_lowercase_alphabet } = response;

    return (
      <div className="mt-4">
        {selectedOptions.some(option => option.value === 'Alphabets') && (
          <div className="mb-2">
            <strong>Alphabets:</strong> {JSON.stringify(alphabets)}
          </div>
        )}
        {selectedOptions.some(option => option.value === 'Numbers') && (
          <div className="mb-2">
            <strong>Numbers:</strong> {JSON.stringify(numbers)}
          </div>
        )}
        {selectedOptions.some(option => option.value === 'Highest Lowercase Alphabet') && (
          <div className="mb-2">
            <strong>Highest Lowercase Alphabet:</strong> {JSON.stringify(highest_lowercase_alphabet)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 p-6 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">JSON Input Processor</h1>

        <textarea
          placeholder='Enter JSON here'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          rows={5}
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />

        <br />

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Submit
        </button>

        {error && <div className="mt-4 text-red-600">{error}</div>}

        {response && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Filter Options</h2>

            {/* Multi-Select Dropdown */}
            <Select
              isMulti
              options={options}
              onChange={handleMultiSelectChange}
              className="mt-2"
            />

            <h2 className="text-lg font-semibold mt-6">Response</h2>
            {renderResponse()}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
