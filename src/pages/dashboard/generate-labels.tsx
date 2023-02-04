/*
 * Created on Fri Feb 03 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import { useState } from "react";
import QRCode from "react-qr-code";
import classNames from "classnames";
import html2canvas from "html2canvas";

import api from "@/api";
import withAuth from "@/hoc/withAuth";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import { useMutation } from "@tanstack/react-query";

const DashboardGenerateLabelsPage: React.FC = () => {
  const [labels, setLabels] = useState<string[]>(["1", "2", "3", "4", "%", "6"]);

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
      onError: (error) => {},
    });
  };

  const onDownloadLabelSheet = () => {
    const element = document.getElementById("labelSheet");

    if (!element) return;

    html2canvas(element, { backgroundColor: null }).then((canvas) => {
      let a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "label-sheet.png";
      a.click();
    });
  };

  return (
    <Layout>
      <Layout.Header>Generate Labels</Layout.Header>
      <Layout.Content>
        <div className="flex items-center gap-x-5">
          <Button onClick={handleGenerateLabelSheet} loading={createLabelSheetMutation.isLoading}>
            Generate Label Sheet
          </Button>
          <Button onClick={onDownloadLabelSheet}>Download Label Sheet</Button>
        </div>

        {labels.length > 0 && (
          <div className="mt-10 flex justify-center ">
            <div className="rounded-2xl border border-gray-200 px-6 pb-6">
              <div id="labelSheet" className="h-[504px] w-[886px] ">
                <div className="grid h-full grid-cols-3 grid-rows-2 ">
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
                      <QRCode size={128} value={label.toString()} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout.Content>
    </Layout>
  );
};

export default DashboardGenerateLabelsPage;
