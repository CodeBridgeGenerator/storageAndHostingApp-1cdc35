import React from "react";
import { render, screen } from "@testing-library/react";

import RateTableCreateDialogComponent from "../RateTableCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders rateTable create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RateTableCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("rateTable-create-dialog-component"),
  ).toBeInTheDocument();
});
