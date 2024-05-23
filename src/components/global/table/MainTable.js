"use client";
import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, dateFilter, numberFilter } from 'react-bootstrap-table2-filter';

import "./MainTable.css"




const MainTable = (props) => {

  const { SearchBar } = Search;



  const options = {
    sizePerPage: props.sizePerPage,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
    filter: filterFactory(),
  
  };

  return (
      <div className={`main-table ${props.class}`}>
      <ToolkitProvider
        keyField="id"
        data={props.data}
        columns={props.columns}
        search={{ searchFormatted: true }}
      >
        {(props) => (
          <div>
            <SearchBar {...props.searchProps} />
            <hr />
            <BootstrapTable  pagination={ paginationFactory(options) } {...props.baseProps} filter={ filterFactory() } />
          </div>
        )}
      </ToolkitProvider>
    </div>
  );
};

export default MainTable;
