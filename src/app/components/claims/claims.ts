import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridReadyEvent, GridApi, ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { CommonModule } from '@angular/common';

// Register all AG Grid Community modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface ClaimData {
  claimNo: string;
  refNo: string;
  insuredUser: string;
  intimDate: string;
  intimUser: string;
  docCompDate: string;
  maxPayDate: string;
  lossDate: string;
  osAmt: string;
  pendingAt: string;
  processor: string;
  highlight?: boolean;
}

@Component({
  selector: 'app-claims',
  standalone: true,
  imports: [AgGridAngular, CommonModule],
  templateUrl: './claims.html',
  styleUrl: './claims.css',
})
export class Claims {
  private gridApi!: GridApi;
  
  // Column definitions with filter and sort enabled
  columnDefs: ColDef[] = [
    { field: 'claimNo', headerName: 'Claim No.', filter: true, sortable: true, width: 200 },
    { field: 'refNo', headerName: 'Ref No.', filter: true, sortable: true, width: 150 },
    { field: 'insuredUser', headerName: 'Insured User', filter: true, sortable: true, width: 220 },
    { field: 'intimDate', headerName: 'Intim Date', filter: true, sortable: true, width: 170 },
    { field: 'intimUser', headerName: 'Intim User', filter: true, sortable: true, width: 150 },
    { field: 'docCompDate', headerName: 'Doc Comp Date', filter: true, sortable: true, width: 170 },
    { field: 'maxPayDate', headerName: 'Max Pay Date', filter: true, sortable: true, width: 170 },
    { field: 'lossDate', headerName: 'Loss Date', filter: true, sortable: true, width: 150 },
    { field: 'osAmt', headerName: 'OS Amt', filter: true, sortable: true, width: 120 },
    { field: 'pendingAt', headerName: 'Pending At', filter: true, sortable: true, width: 150 },
    { field: 'processor', headerName: 'Processor', filter: true, sortable: true, width: 150 },
  ];

  // Default column definitions
  defaultColDef: ColDef = {
    resizable: true,
    filter: 'agTextColumnFilter',
    floatingFilter: true,
  };

  // Pagination settings
  paginationPageSize = 9; // 9 items per page to get 4 pages from 36 items
  paginationPageSizeSelector = [9, 18, 36];

  // Sample data - 36 items
  rowData: ClaimData[] = [
    {
      claimNo: 'GC/210/502/2025/17434',
      refNo: 'REF001',
      insuredUser: 'Dr. Puthen Purackel Jean',
      intimDate: '26/11/2025 02:39',
      intimUser: 'User001',
      docCompDate: '27/11/2025',
      maxPayDate: '30/12/2025',
      lossDate: '25/11/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept A',
      processor: 'Processor 1',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17435',
      refNo: 'REF002',
      insuredUser: 'Ahmed Al-Mansour',
      intimDate: '25/11/2025 14:20',
      intimUser: 'User002',
      docCompDate: '26/11/2025',
      maxPayDate: '29/12/2025',
      lossDate: '24/11/2025',
      osAmt: 'SAR 1,500.00',
      pendingAt: 'Dept B',
      processor: 'Processor 2',
      highlight: false
    },
    {
      claimNo: 'GC/210/502/2025/17436',
      refNo: 'REF003',
      insuredUser: 'Sarah Johnson',
      intimDate: '24/11/2025 09:15',
      intimUser: 'User003',
      docCompDate: '25/11/2025',
      maxPayDate: '28/12/2025',
      lossDate: '23/11/2025',
      osAmt: 'SAR 2,300.00',
      pendingAt: 'Dept C',
      processor: 'Processor 3',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17437',
      refNo: 'REF004',
      insuredUser: 'Mohammed Hassan',
      intimDate: '23/11/2025 16:45',
      intimUser: 'User004',
      docCompDate: '24/11/2025',
      maxPayDate: '27/12/2025',
      lossDate: '22/11/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept A',
      processor: 'Processor 1',
      highlight: false
    },
    {
      claimNo: 'GC/210/502/2025/17438',
      refNo: 'REF005',
      insuredUser: 'Emily Chen',
      intimDate: '22/11/2025 11:30',
      intimUser: 'User005',
      docCompDate: '23/11/2025',
      maxPayDate: '26/12/2025',
      lossDate: '21/11/2025',
      osAmt: 'SAR 5,000.00',
      pendingAt: 'Dept D',
      processor: 'Processor 4',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17439',
      refNo: 'REF006',
      insuredUser: 'Fatima Al-Zahra',
      intimDate: '21/11/2025 08:00',
      intimUser: 'User006',
      docCompDate: '22/11/2025',
      maxPayDate: '25/12/2025',
      lossDate: '20/11/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept B',
      processor: 'Processor 2',
      highlight: false
    },
    {
      claimNo: 'GC/210/502/2025/17440',
      refNo: 'REF007',
      insuredUser: 'Robert Smith',
      intimDate: '20/11/2025 13:22',
      intimUser: 'User007',
      docCompDate: '21/11/2025',
      maxPayDate: '24/12/2025',
      lossDate: '19/11/2025',
      osAmt: 'SAR 3,750.00',
      pendingAt: 'Dept C',
      processor: 'Processor 3',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17441',
      refNo: 'REF008',
      insuredUser: 'Aisha Mohammed',
      intimDate: '19/11/2025 10:10',
      intimUser: 'User008',
      docCompDate: '20/11/2025',
      maxPayDate: '23/12/2025',
      lossDate: '18/11/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept A',
      processor: 'Processor 1',
      highlight: false
    },
    {
      claimNo: 'GC/210/502/2025/17442',
      refNo: 'REF009',
      insuredUser: 'David Wilson',
      intimDate: '18/11/2025 15:55',
      intimUser: 'User009',
      docCompDate: '19/11/2025',
      maxPayDate: '22/12/2025',
      lossDate: '17/11/2025',
      osAmt: 'SAR 1,200.00',
      pendingAt: 'Dept D',
      processor: 'Processor 4',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17443',
      refNo: 'REF010',
      insuredUser: 'Layla Ahmed',
      intimDate: '17/11/2025 12:40',
      intimUser: 'User010',
      docCompDate: '18/11/2025',
      maxPayDate: '21/12/2025',
      lossDate: '16/11/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept B',
      processor: 'Processor 2',
      highlight: false
    },
    {
      claimNo: 'GC/210/502/2025/17444',
      refNo: 'REF011',
      insuredUser: 'James Brown',
      intimDate: '16/11/2025 09:25',
      intimUser: 'User011',
      docCompDate: '17/11/2025',
      maxPayDate: '20/12/2025',
      lossDate: '15/11/2025',
      osAmt: 'SAR 4,500.00',
      pendingAt: 'Dept C',
      processor: 'Processor 3',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17445',
      refNo: 'REF012',
      insuredUser: 'Noor Abdullah',
      intimDate: '15/11/2025 14:15',
      intimUser: 'User012',
      docCompDate: '16/11/2025',
      maxPayDate: '19/12/2025',
      lossDate: '14/11/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept A',
      processor: 'Processor 1',
      highlight: false
    },
    {
      claimNo: 'GC/210/502/2025/17446',
      refNo: 'REF013',
      insuredUser: 'Michael Davis',
      intimDate: '14/11/2025 11:05',
      intimUser: 'User013',
      docCompDate: '15/11/2025',
      maxPayDate: '18/12/2025',
      lossDate: '13/11/2025',
      osAmt: 'SAR 2,800.00',
      pendingAt: 'Dept D',
      processor: 'Processor 4',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17447',
      refNo: 'REF014',
      insuredUser: 'Zahra Ali',
      intimDate: '13/11/2025 08:50',
      intimUser: 'User014',
      docCompDate: '14/11/2025',
      maxPayDate: '17/12/2025',
      lossDate: '12/11/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept B',
      processor: 'Processor 2',
      highlight: false
    },
    {
      claimNo: 'GC/210/502/2025/17448',
      refNo: 'REF015',
      insuredUser: 'Thomas Anderson',
      intimDate: '12/11/2025 16:30',
      intimUser: 'User015',
      docCompDate: '13/11/2025',
      maxPayDate: '16/12/2025',
      lossDate: '11/11/2025',
      osAmt: 'SAR 6,200.00',
      pendingAt: 'Dept C',
      processor: 'Processor 3',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17449',
      refNo: 'REF016',
      insuredUser: 'Maryam Ibrahim',
      intimDate: '11/11/2025 13:20',
      intimUser: 'User016',
      docCompDate: '12/11/2025',
      maxPayDate: '15/12/2025',
      lossDate: '10/11/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept A',
      processor: 'Processor 1',
      highlight: false
    },
    {
      claimNo: 'GC/210/502/2025/17450',
      refNo: 'REF017',
      insuredUser: 'Christopher Lee',
      intimDate: '10/11/2025 10:15',
      intimUser: 'User017',
      docCompDate: '11/11/2025',
      maxPayDate: '14/12/2025',
      lossDate: '09/11/2025',
      osAmt: 'SAR 3,400.00',
      pendingAt: 'Dept D',
      processor: 'Processor 4',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17451',
      refNo: 'REF018',
      insuredUser: 'Huda Saleh',
      intimDate: '09/11/2025 15:45',
      intimUser: 'User018',
      docCompDate: '10/11/2025',
      maxPayDate: '13/12/2025',
      lossDate: '08/11/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept B',
      processor: 'Processor 2',
      highlight: false
    },
    {
      claimNo: 'GC/210/502/2025/17452',
      refNo: 'REF019',
      insuredUser: 'Daniel Martinez',
      intimDate: '08/11/2025 12:35',
      intimUser: 'User019',
      docCompDate: '09/11/2025',
      maxPayDate: '12/12/2025',
      lossDate: '07/11/2025',
      osAmt: 'SAR 5,600.00',
      pendingAt: 'Dept C',
      processor: 'Processor 3',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17453',
      refNo: 'REF020',
      insuredUser: 'Amina Yusuf',
      intimDate: '07/11/2025 09:10',
      intimUser: 'User020',
      docCompDate: '08/11/2025',
      maxPayDate: '11/12/2025',
      lossDate: '06/11/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept A',
      processor: 'Processor 1',
      highlight: false
    },
    {
      claimNo: 'GC/210/502/2025/17454',
      refNo: 'REF021',
      insuredUser: 'Matthew Taylor',
      intimDate: '06/11/2025 14:50',
      intimUser: 'User021',
      docCompDate: '07/11/2025',
      maxPayDate: '10/12/2025',
      lossDate: '05/11/2025',
      osAmt: 'SAR 2,100.00',
      pendingAt: 'Dept D',
      processor: 'Processor 4',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17455',
      refNo: 'REF022',
      insuredUser: 'Yasmin Omar',
      intimDate: '05/11/2025 11:25',
      intimUser: 'User022',
      docCompDate: '06/11/2025',
      maxPayDate: '09/12/2025',
      lossDate: '04/11/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept B',
      processor: 'Processor 2',
      highlight: false
    },
    {
      claimNo: 'GC/210/502/2025/17456',
      refNo: 'REF023',
      insuredUser: 'Andrew White',
      intimDate: '04/11/2025 08:40',
      intimUser: 'User023',
      docCompDate: '05/11/2025',
      maxPayDate: '08/12/2025',
      lossDate: '03/11/2025',
      osAmt: 'SAR 4,900.00',
      pendingAt: 'Dept C',
      processor: 'Processor 3',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17457',
      refNo: 'REF024',
      insuredUser: 'Rana Khalil',
      intimDate: '03/11/2025 16:15',
      intimUser: 'User024',
      docCompDate: '04/11/2025',
      maxPayDate: '07/12/2025',
      lossDate: '02/11/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept A',
      processor: 'Processor 1',
      highlight: false
    },
    {
      claimNo: 'GC/210/502/2025/17458',
      refNo: 'REF025',
      insuredUser: 'Joshua Harris',
      intimDate: '02/11/2025 13:05',
      intimUser: 'User025',
      docCompDate: '03/11/2025',
      maxPayDate: '06/12/2025',
      lossDate: '01/11/2025',
      osAmt: 'SAR 3,300.00',
      pendingAt: 'Dept D',
      processor: 'Processor 4',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17459',
      refNo: 'REF026',
      insuredUser: 'Samira Nasir',
      intimDate: '01/11/2025 09:55',
      intimUser: 'User026',
      docCompDate: '02/11/2025',
      maxPayDate: '05/12/2025',
      lossDate: '31/10/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept B',
      processor: 'Processor 2',
      highlight: false
    },
    {
      claimNo: 'GC/210/502/2025/17460',
      refNo: 'REF027',
      insuredUser: 'Kevin Clark',
      intimDate: '31/10/2025 15:30',
      intimUser: 'User027',
      docCompDate: '01/11/2025',
      maxPayDate: '04/12/2025',
      lossDate: '30/10/2025',
      osAmt: 'SAR 7,500.00',
      pendingAt: 'Dept C',
      processor: 'Processor 3',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17461',
      refNo: 'REF028',
      insuredUser: 'Lina Hassan',
      intimDate: '30/10/2025 12:20',
      intimUser: 'User028',
      docCompDate: '31/10/2025',
      maxPayDate: '03/12/2025',
      lossDate: '29/10/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept A',
      processor: 'Processor 1',
      highlight: false
    },
    {
      claimNo: 'GC/210/502/2025/17462',
      refNo: 'REF029',
      insuredUser: 'Brian Lewis',
      intimDate: '29/10/2025 08:45',
      intimUser: 'User029',
      docCompDate: '30/10/2025',
      maxPayDate: '02/12/2025',
      lossDate: '28/10/2025',
      osAmt: 'SAR 2,700.00',
      pendingAt: 'Dept D',
      processor: 'Processor 4',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17463',
      refNo: 'REF030',
      insuredUser: 'Reem Fadel',
      intimDate: '28/10/2025 14:35',
      intimUser: 'User030',
      docCompDate: '29/10/2025',
      maxPayDate: '01/12/2025',
      lossDate: '27/10/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept B',
      processor: 'Processor 2',
      highlight: false
    },
    {
      claimNo: 'GC/210/502/2025/17464',
      refNo: 'REF031',
      insuredUser: 'Steven Walker',
      intimDate: '27/10/2025 11:10',
      intimUser: 'User031',
      docCompDate: '28/10/2025',
      maxPayDate: '30/11/2025',
      lossDate: '26/10/2025',
      osAmt: 'SAR 5,400.00',
      pendingAt: 'Dept C',
      processor: 'Processor 3',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17465',
      refNo: 'REF032',
      insuredUser: 'Dina Mahmoud',
      intimDate: '26/10/2025 16:00',
      intimUser: 'User032',
      docCompDate: '27/10/2025',
      maxPayDate: '29/11/2025',
      lossDate: '25/10/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept A',
      processor: 'Processor 1',
      highlight: false
    },
    {
      claimNo: 'GC/210/502/2025/17466',
      refNo: 'REF033',
      insuredUser: 'Patrick King',
      intimDate: '25/10/2025 12:50',
      intimUser: 'User033',
      docCompDate: '26/10/2025',
      maxPayDate: '28/11/2025',
      lossDate: '24/10/2025',
      osAmt: 'SAR 3,900.00',
      pendingAt: 'Dept D',
      processor: 'Processor 4',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17467',
      refNo: 'REF034',
      insuredUser: 'Salma Hamza',
      intimDate: '24/10/2025 09:30',
      intimUser: 'User034',
      docCompDate: '25/10/2025',
      maxPayDate: '27/11/2025',
      lossDate: '23/10/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept B',
      processor: 'Processor 2',
      highlight: false
    },
    {
      claimNo: 'GC/210/502/2025/17468',
      refNo: 'REF035',
      insuredUser: 'Gregory Scott',
      intimDate: '23/10/2025 15:20',
      intimUser: 'User035',
      docCompDate: '24/10/2025',
      maxPayDate: '26/11/2025',
      lossDate: '22/10/2025',
      osAmt: 'SAR 6,800.00',
      pendingAt: 'Dept C',
      processor: 'Processor 3',
      highlight: true
    },
    {
      claimNo: 'GC/210/502/2025/17469',
      refNo: 'REF036',
      insuredUser: 'Nadia Farouk',
      intimDate: '22/10/2025 11:40',
      intimUser: 'User036',
      docCompDate: '23/10/2025',
      maxPayDate: '25/11/2025',
      lossDate: '21/10/2025',
      osAmt: 'SAR 0.00',
      pendingAt: 'Dept A',
      processor: 'Processor 1',
      highlight: false
    }
  ];

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  getRowStyle = (params: any) => {
    if (params.data.highlight) {
      return { background: '#FFE5CC' }; // Orange highlight
    }
    return undefined;
  };
}
