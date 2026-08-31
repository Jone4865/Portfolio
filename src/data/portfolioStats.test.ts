import { projects } from './projects';
import { portfolioStats } from './portfolioStats';

describe('portfolioStats', () => {
  it('projects count matches active projects array length', () => {
    expect(portfolioStats.projects).toBe(projects.length);
  });
});
