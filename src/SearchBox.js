import React, { useState } from 'react';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Panel } from 'primereact/panel';
import { Toast } from 'primereact/toast';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [layout, setLayout] = useState('list');
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

  const gridItem = (result) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2">
        <div className="p-4 border-1 surface-border surface-card border-round justify-content-between">
          <div className="flex flex-column align-items-center gap-3 py-2">
            <div>{result.Name}</div>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-2">
            <div>{result.Status}</div>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-2">
            <div>{result.RegistrationNumber}</div>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-2">
            <div>{result.RegistrationDateFormatted}</div>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-2">
            <div>{result.Type}</div>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-2">
            <div>{result.BusinessActivities}</div>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (result, layout) => {
    if (!result) {
      return;
    } 

    if (layout === 'grid') return gridItem(result);
    return null;
  };

  return (
    <div className="card">
      <Toast ref={toast} />
      {/* Search Form */}
      <div className="p-grid p-justify-center" style={{ padding: '2rem' }}>
        <div className="p-col-12 p-md-8">
          <form onSubmit={handleSearch} className="p-formgroup-inline p-d-flex p-ai-center">
            <div className="flex justify-content-between mb-5 border-primary-500 ">
                <IconField iconPosition="left" className="search-bar ">
                    <InputIcon className="pi pi-search" />
                    <InputText
                        id="search"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-inputtext-md p-search-input"
                        placeholder="Enter Company Name..."
                    />
                </IconField>

                    {/* Layout Button */}
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
          </form>
        </div>
        {/* Loading Spinner */}
        {loading && (
          <div className="p-col-12 p-text-center p-my-5">
            <ProgressSpinner />
          </div>
        )}
        {/* Results Table or Grid */}
        <Panel header={
          <div className="flex justify-content-end align-items-center">
            {/* Display search result count only after search */}
            <span>Search Results:</span>
            {results.length > 0 && (
              <span> <b>{results.length}</b> result{results.length > 1 ? 's' : ''} found.</span>
            )}
          </div>
        } className="p-shadow-3">
          {/* Results Table or Grid */}
          {layout === 'list' ? (
            <DataTable value={results} paginator rows={10} className="p-datatable-gridlines">
              <Column field="Name" style={{ width: '30%' }} header="Company Name" sortable></Column>
              <Column field="RegistrationNumber" style={{ width: '8%' }} header="Registration Number" sortable></Column>
              <Column field="Type" style={{ width: '10%' }} header="Entity Type" sortable></Column>
              <Column field="RegistrationDateFormatted" style={{ width: '5%' }} header="Prior Registration Date" sortable></Column>
              <Column field="Status" style={{ width: '10%' }} header="Entity Status" sortable></Column>
              <Column field="BusinessActivities" header="Business Activities"></Column>
            </DataTable>
          ) : (
            <DataView value={results} layout={layout} itemTemplate={(result) => itemTemplate(result, layout)} />
          )}
        </Panel>

      </div>
    </div>
  );
};

export default Search;
