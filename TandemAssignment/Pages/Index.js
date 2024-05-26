// pages/index.js
import { useState } from 'react';
import { parseExcelFile } from '../utils/parseExcel';
import { identifyStoppages } from '../utils/stoppages';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('../Components/Map'), { ssr: false });

export default function Home() {
  const [path, setPath] = useState([]);
  const [stoppages, setStoppages] = useState([]);
  const [threshold, setThreshold] = useState(10); // default threshold in minutes

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const data = await parseExcelFile(file);
    setPath(data);
    const stoppages = identifyStoppages(data, threshold);
    setStoppages(stoppages);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <input
        type="number"
        value={threshold}
        onChange={(e) => setThreshold(e.target.value)}
        placeholder="Stoppage Threshold (minutes)"
      />
      {path.length > 0 && <DynamicMap path={path} stoppages={stoppages} />}
    </div>
  );
}
