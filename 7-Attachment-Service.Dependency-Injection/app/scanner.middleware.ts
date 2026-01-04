export type IssuesDetected = boolean;

export interface Scanner {
  /**
   * Scan un fichier et retourne true si des issues sont détectées
   *
   * @param filePath the uploaded file path
   * @returns Promise<boolean> true if issues detected
   *
   */
  scan(filePath: string): Promise<IssuesDetected>;
}

export class ThreatProtectScannerMiddleware implements Scanner {
  async scan(filePath: string): Promise<IssuesDetected> {
    console.log(`🔍 Scanning file at path: ${filePath}`);
    // Simuler une analyse de sécurité
    const issuesDetected = false; // Pour l'exemple, on retourne toujours false (pas d'issues)
    if (issuesDetected) {
      console.log(`⚠️ Issues detected in file: ${filePath}`);
    } else {
      console.log(`✅ No issues detected in file: ${filePath}`);
    }
    return issuesDetected;
  }
}

export class SynergySecurityScanner implements Scanner {
  async scan(filePath: string): Promise<IssuesDetected> {
    // Simuler une analyse de sécurité
    console.log(`🔐 SynergySecurity scanning file at path: ${filePath}`);
    // Pour l'exemple, on retourne toujours false (pas d'issues)
    return false;
  }
}
