import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [layout, setLayout] = useState('grid');
  const toast = React.useRef(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.get('https://www.myco.dica.gov.mm/Api/Corp/SearchCorp', {
        params: { Term: searchTerm },
      });
      setResults(data.records || []);
      if (data.records.length === 0) {
        toast.current.show({ severity: 'info', summary: 'No Results Found', detail: 'Try a different search term.' });
      }
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to fetch data. Please try again.' });
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const listItem = (result, index) => {
    return (
      <div className="col-12" key={result.RegistrationNumber}>
        <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2sm font-bold text-900">{result.Name}</div>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <span className="font-semibold">{result.Type}</span>
                </span>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">{result.RegistrationNumber}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gridItem = (result) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={result.RegistrationNumber}>
        <div className="p-4 border-1 surface-border surface-card border-round">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{result.Type}</span>
            </div>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            <div className="text-2xl font-bold">{result.Name}</div>
          </div>
          <div className="flex align-items-center justify-content-between">
            <span className="text-2xl font-semibold">{result.RegistrationNumber}</span>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (result, layout, index) => {
    if (!result) {
      return;
    }

    if (layout === 'list') return listItem(result, index);
    else if (layout === 'grid') return gridItem(result);
  };

  const listTemplate = (results, layout) => {
    return <div className="grid grid-nogutter">{results.map((result, index) => itemTemplate(result, layout, index))}</div>;
  };

  const header = () => {
    return (
      <div className="flex justify-content-end">
        <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
      </div>
    );
  };

  return (
    <div className="card">
      <Toast ref={toast} />
      {/* Search Form */}
      <div className="p-grid p-justify-center" style={{ padding: '2rem' }}>
        <div className="p-col-12 p-md-8">
          <form onSubmit={handleSearch} className="p-formgroup-inline p-d-flex p-ai-center">
            <div className="card flex justify-content-center mb-5">
              <InputText
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-inputtext-md"
                placeholder="Enter Company Name..."
              />
              <Button label="Search" icon="pi pi-search" className="p-button-outlined" onClick={handleSearch} />
            </div>
          </form>
        </div>
        {/* Loading Spinner */}
        {loading && (
          <div className="p-col-12 p-text-center p-my-5">
            <ProgressSpinner />
          </div>
        )}
        {/* Results Table */}
        <Panel header="Search Results" className="p-shadow-3">
          <div className="p-align-content-center">
            <b>{results.length}</b> result{results.length > 1 ? 's' : ''} found.
          </div>
          <DataView value={results} listTemplate={listTemplate} layout={layout} header={header()} />
        </Panel>
      </div>
    </div>
  );
};

export default Search;
