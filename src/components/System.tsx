import React from 'react';
import os from 'os';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {useTranslation} from 'react-i18next';
import electron from 'electron';

const userInfo = os.userInfo();

const toMB = (bytes: number) => (bytes / (1024 * 1024)).toFixed(2) + ' MB';

export const SYSTEM_PAIRS: { name: string, value: string | number }[] = [
    {
        name: 'username',
        value: userInfo.username,
    },
    {
        name: 'gid',
        value: userInfo.gid,
    },
    {
        name: 'uid',
        value: userInfo.uid,
    },
    {
        name: 'shell',
        value: userInfo.shell,
    },
    {
        name: 'networkInterfaces',
        value: JSON.stringify(os.networkInterfaces()),
    },
    {
        name: 'cpus',
        value: JSON.stringify(os.cpus()),
    },
    {
        name: 'loadAverage',
        value: JSON.stringify(os.loadavg()),
    },
    {
        name: 'arch',
        value: os.arch(),
    },
    {
        name: 'ramFree',
        value: toMB(os.freemem()),
    },
    {
        name: 'homeDir',
        value: os.homedir(),
    },
    {
        name: 'hostname',
        value: os.hostname(),
    },
    {
        name: 'platform',
        value: os.platform(),
    },
    {
        name: 'release',
        value: os.release(),
    },
    {
        name: 'tempDir',
        value: os.tmpdir(),
    },
    {
        name: 'ramTotal',
        value: toMB(os.totalmem()),
    },
    {
        name: 'osType',
        value: os.type(),
    },
    {
        name: 'uptime',
        value: os.uptime(),
    },
    {
        name: 'endianness',
        value: os.endianness(),
    },
    {
        name: 'userDataDir',
        value: electron.remote.app.getPath('userData')
    },
];

export const System = () => {
    const {t} = useTranslation('system');

    return <TableContainer>
        <Table>
            <TableBody>
                {SYSTEM_PAIRS.map((row, i) => <TableRow key={i}>
                    <TableCell component='th' scope='row'>
                        {t(row.name)}
                    </TableCell>

                    <TableCell align='right'>
                        {row.value}
                    </TableCell>
                </TableRow>)}
            </TableBody>
        </Table>
    </TableContainer>;
};