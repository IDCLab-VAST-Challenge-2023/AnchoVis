# AnchoVis: Visual Analytics for Combating Illegal Fishing by Detecting Anomalous Structures :fishing_pole_and_fish:

This project is a submission to [Mini-Challenge 3 (MC3)](https://vast-challenge.github.io/2023/MC3.html) of [the Visual Analytics Science and Technology (VAST) Challenge 2023](https://vast-challenge.github.io/2023/index.html).

<img src="https://github.com/IDCLab-VAST-Challenge-2023/VAST-Challenge-2023-MC3/assets/64757426/382b35ce-9bd2-4281-8de5-c119c26d7cf5">

## Tools and Libraries

- Python
  - networkx
  - nltk
  - pandas
  - wordcloud
  - jupyter notebook
- Next.js
  - chart.js

## Challenge Overview

Seafood is one of the most widely traded commodities in the global food market.
Unfortunately, illegal, unreported, and unregulated fishing significantly contributes to overfishing worldwide. These activities threaten not only fragile marine ecosystems but also food security in coastal communities and regional stability more broadly. The illegal fishing trade has been linked to organized crime, and human rights violations are common when fishing operations are conducted without regulatory oversight.

NGO FishEye International is a nonpartisan organization that understands the social, political, and economic forces that drive the illegal fishing trade. They have spent the past several years collecting data. In mid-April, FishEye International plans to make several datasets available to the public, along with a series of questions surrounding illegal fishing and its broader impacts. They are asking the Visual Analytics community to help them make sense of this often-conflicting data and to make recommendations for how to proceed.

## Mini-Challenge 3

FishEye International has been given access to an international finance corporation's database on fishing-related companies. In the past, FishEye has determined that companies with anomalous structures are far more likely to be involved in IUU (or other "fishy" businesses). FishEye has transformed the database into a knowledge graph. FishEye aims to use this graph to identify anomalies indicating that a company is involved in IUU. FishEye analysts have attempted to use traditional node-link visualizations and standard graph analyses. However, these were ineffective because the data's scale and detail can obscure a business's structure.

Therefore, we propose _<strong>AnchoVIS</strong>_, a visualization tool, instead of traditional node-link visualizations to find anomalous patterns within network data. Our visualization tool operates by assessing the degree of similarity at the node level, specifically by determining how many targets a given pair of sources share. This similarity metric is used to filter and display the data. Utilizing this tool allows users to adjust the similarity value as they explore the data, facilitating the identification of companies exhibiting anomalous patterns linked to IUU fishing.

## Authors

- Myeongwon Jung
- Donghee Hong
- Seonghyeon Cho
- Jiwon Choi
