import React from "react";
import { render, screen } from "@testing-library/react";

import StorageBillCreateDialogComponent from "../StorageBillCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders storageBill create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <StorageBillCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("storageBill-create-dialog-component"),
  ).toBeInTheDocument();
});
