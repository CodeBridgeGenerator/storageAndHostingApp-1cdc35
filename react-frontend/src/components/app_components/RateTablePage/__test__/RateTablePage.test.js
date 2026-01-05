import React from "react";
import { render, screen } from "@testing-library/react";

import RateTablePage from "../RateTablePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders rateTable page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RateTablePage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("rateTable-datatable")).toBeInTheDocument();
  expect(screen.getByRole("rateTable-add-button")).toBeInTheDocument();
});
