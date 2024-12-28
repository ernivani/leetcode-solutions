function sortPeople(names: string[], heights: number[]): string[] {
    const indices = Array.from({ length: names.length }, (_, i) => i);
    indices.sort((a, b) => heights[b] - heights[a]);
    
    return indices.map(i => names[i]);
} 