const normalizeAssets = (assets: { name: string; type_is_crypto: boolean }[]) =>
  assets.filter((asset) => asset.name && asset.type_is_crypto);

export default normalizeAssets;
