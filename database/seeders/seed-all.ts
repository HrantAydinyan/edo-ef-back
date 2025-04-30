import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

const seeders = [
  'seed:admin',
  'seed:privacy-policy',
  'seed:hero-section',
  'seed:imprint',
];

const runSeeder = async (seeder: string): Promise<void> => {
  try {
    const { stdout, stderr } = await execAsync(`npm run ${seeder}`);
    if (stderr) {
      console.error(`Error running ${seeder}: ${stderr}`);
    } else {
      console.log(`${seeder} output: ${stdout}`);
    }
  } catch (error) {
    console.error(`Failed to run ${seeder}: ${error.message}`);
    throw error;
  }
};

const runAllSeeders = async (sequential = false): Promise<void> => {
  try {
    if (sequential) {
      for (const seeder of seeders) {
        await runSeeder(seeder);
      }
    } else {
      await Promise.all(seeders.map(runSeeder));
    }
    console.log('All seeders completed successfully.');
  } catch (error) {
    console.error(`Seeding process failed: ${error.message}`);
    process.exit(1);
  }
};

runAllSeeders(true);
