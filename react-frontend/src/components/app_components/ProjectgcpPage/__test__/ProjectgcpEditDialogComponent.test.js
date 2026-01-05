import React from "react";
import { render, screen } from "@testing-library/react";

import ProjectgcpEditDialogComponent from "../ProjectgcpEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders projectgcp edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ProjectgcpEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("projectgcp-edit-dialog-component"),
  ).toBeInTheDocument();
});
