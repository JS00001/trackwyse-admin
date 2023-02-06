/*
 * Created on Fri Feb 03 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import lodash from "lodash";
import QRCode from "react-qr-code";
import classNames from "classnames";
import html2canvas from "html2canvas";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

import api from "@/api";
import withAuth from "@/hoc/withAuth";
import Layout from "@/components/Layout";
import Button from "@/components/Button";

import LabelsBlue from "@/assets/LabelsBlue";
import LabelsPink from "@/assets/LabelsPink";
import LabelsYellow from "@/assets/LabelsYellow";
import LabelsOrange from "@/assets/LabelsOrange";
import Menu from "@/components/Menu";

const DashboardGenerateLabelsPage: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [labels, setLabels] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<"blue" | "pink" | "yellow" | "orange">("blue");

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const createLabelSheetMutation = useMutation({
    mutationFn: async () => {
      return api.createLabelSheet();
    },
  });

  const handleGenerateLabelSheet = async () => {
    createLabelSheetMutation.mutate(undefined, {
      onSuccess: ({ data }) => {
        const labelData = data.labels.map((label) => `trw://${label.uniqueID}`);
        setLabels(labelData);
      },
    });
  };

  const onDownloadLabelSheet = () => {
    const element = divRef.current;

    if (!element) return;

    html2canvas(element, {
      onclone: (document) => {
        // set the display style of the cloned element to 'block'
        // so that it is visible in the canvas
        const element = document.getElementById("offscreenLabels");

        if (!element) return;

        element!.style.display = "block";
      },
      backgroundColor: null,
    }).then((canvas) => {
      let a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "label-sheet.png";
      a.click();
    });
  };

  return (
    <Layout>
      <Layout.Header>Generate Labels</Layout.Header>
      <Layout.Content className="mt-10">
        <div className="flex items-center gap-x-5">
          <Menu open={menuOpen} position="bottom">
            <Menu.Item
              title="Blue"
              onClick={() => {
                setSelectedColor("blue");
                handleMenuToggle();
              }}
            />
            <Menu.Item
              title="Pink"
              onClick={() => {
                setSelectedColor("pink");
                handleMenuToggle();
              }}
            />
            <Menu.Item
              title="Yellow"
              onClick={() => {
                setSelectedColor("yellow");
                handleMenuToggle();
              }}
            />
            <Menu.Item
              title="Orange"
              onClick={() => {
                setSelectedColor("orange");
                handleMenuToggle();
              }}
            />
            <Menu.Button>
              <Button onClick={handleMenuToggle} iconRight="IoChevronDown">
                {selectedColor === "blue"
                  ? "Color - Blue"
                  : selectedColor === "pink"
                  ? "Color - Pink"
                  : selectedColor === "yellow"
                  ? "Color - Yellow"
                  : "Color - Orange"}
              </Button>
            </Menu.Button>
          </Menu>
          <Button
            iconRight="IoColorWand"
            onClick={handleGenerateLabelSheet}
            loading={createLabelSheetMutation.isLoading}
          >
            Generate Label Sheet
          </Button>
          <Button
            iconRight="IoCodeDownloadOutline"
            onClick={onDownloadLabelSheet}
            disabled={lodash.isEmpty(labels) || createLabelSheetMutation.isLoading}
          >
            Download Label Sheet
          </Button>
        </div>

        {labels.length > 0 && (
          <div className="mt-4 w-fit rounded-md border border-gray-200 p-10 ">
            <div className="grid h-full grid-cols-3 grid-rows-4 gap-4 ">
              {labels.map((label, index) => (
                <div
                  className={classNames(
                    "flex",
                    index % 3 === 0
                      ? "justify-start"
                      : index % 3 === 1
                      ? "justify-center"
                      : "justify-end",
                    index < 3 ? "items-start" : "items-end"
                  )}
                >
                  <QRCode size={128} value={label.toString()} level="H" />
                </div>
              ))}
            </div>
          </div>
        )}

        {labels.length > 0 && (
          <div id="offscreenLabels" ref={divRef} className="relative hidden">
            {selectedColor === "blue" && <LabelsBlue />}
            {selectedColor === "pink" && <LabelsPink />}
            {selectedColor === "yellow" && <LabelsYellow />}
            {selectedColor === "orange" && <LabelsOrange />}
            {labels.length > 0 && (
              <div className="absolute top-[169px] left-[169px] h-[1008px] w-[886px]">
                <div className="grid h-full grid-cols-3 grid-rows-4 gap-y-[372px] ">
                  {labels.map((label, index) => {
                    return (
                      <div
                        className={classNames(
                          "flex",
                          index % 3 === 0
                            ? "justify-start"
                            : index % 3 === 1
                            ? "justify-center"
                            : "justify-end"
                        )}
                      >
                        <QRCode size={128} value={label.toString()} />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </Layout.Content>
    </Layout>
  );
};

export default DashboardGenerateLabelsPage;
