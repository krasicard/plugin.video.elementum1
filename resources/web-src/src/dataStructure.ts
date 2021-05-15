export interface ITorrent {
  status: string;
  progress: number;
  name: string;
  download_rate: number;
  id: string;
  peers: number;
  peers_total: number;
  ratio: number;
  seed_time: number;
  seed_time_limit: number;
  seeders: number;
  seeders_total: number;
  seeding_time: string;
  size: string;
  time_ratio: number;
  upload_rate: number;
}
