const { KnowledgeAsset, KnowledgeInsight, KnowledgeBaseStat } = require('./models');

const seedKnowledge = async () => {
  try {
    await KnowledgeAsset.destroy({ where: {} });
    await KnowledgeInsight.destroy({ where: {} });
    await KnowledgeBaseStat.destroy({ where: {} });

    const asset1 = await KnowledgeAsset.create({
      title: 'Product_Roadmap_2024_v2.pdf',
      fileType: 'pdf',
      size: '4.2 MB',
      matchPercent: 98,
      lastModified: '2 days ago',
      extractExcerpt: '...the integration of AI agents into the core workspace is slated for Q3. We will prioritize semantic search capabilities...',
      accentColor: 'bg-blue-600 shadow-blue-100',
      iconType: 'FileText'
    });

    await KnowledgeInsight.create({
      KnowledgeAssetId: asset1.id,
      summary: 'This document outlines the strategic vision for the SPAI platform through the 2024 calendar year. Our focus is squarely on reducing the friction between data ingestion and actionable insights.',
      neuralExtract: '"The integration of semantic search allows for querying documents using natural language questions rather than just keyword matching."',
      sectionTitle: 'Section 2 • Market Positioning',
      sectionText: 'We aim to differentiate from legacy document management systems by offering a "Curated Workspace" experience where the AI acts as an editorial layer.'
    });

    const asset2 = await KnowledgeAsset.create({
      title: 'Client_Feedback_Synthesis.docx',
      fileType: 'docx',
      size: '1.1 MB',
      matchPercent: 82,
      lastModified: '5 hours ago',
      extractExcerpt: '...feedback from active beta testers indicates a 40% reduction in manual data entry when using AI-suggested fields...',
      accentColor: 'bg-indigo-600 shadow-indigo-100',
      iconType: 'FileText'
    });

    await KnowledgeInsight.create({
      KnowledgeAssetId: asset2.id,
      summary: 'Aggregation of qualitative feedback from 50 enterprise beta testers. Highlights include high satisfaction with automated tagging and a request for better CSV export formats.',
      neuralExtract: '"Users found the AI suggestions surprisingly accurate, reducing form-filling time by nearly half."',
      sectionTitle: 'Core Findings',
      sectionText: 'Beta testers emphasized the importance of high-fidelity data extraction from messy, semi-structured documents.'
    });

    const asset3 = await KnowledgeAsset.create({
      title: 'Workspace_Architecture_Diagram.png',
      fileType: 'png',
      size: '8.5 MB',
      matchPercent: 75,
      lastModified: 'Oct 12',
      extractExcerpt: '...technical architecture overview identifying the ingestion pipeline and the vector database storage layer...',
      accentColor: 'bg-purple-600 shadow-purple-100',
      iconType: 'Layout'
    });

    await KnowledgeBaseStat.create({
      indexSizeUsed: 4.2,
      indexSizeTotal: 10,
      totalAssets: 128,
      totalEntities: 14000
    });

    console.log('Knowledge Base data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedKnowledge();
