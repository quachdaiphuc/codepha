import React from 'react'

import './style.scss'
import BranchIcon from 'v2Asset/icon-breadcrum.svg'
import GithubIcon from 'v2Asset/icon-github.svg'
import LanguageIcon from 'v2Asset/icon-language.svg'
import Coverage from 'v2Asset/icon-coverage.svg'

const bgrStyle = {
    success: 'success',
    error: 'error',
    killed: 'killed',
    skipped: 'skipped',
    timeout: 'timeout',
    running: 'running',
    pending: 'pending'
}

const RepositoryInfo = ({ repoInfo }) => (
    <div className='RepositoryInfo'>
        <div className='repo-name'>
            <h3>
                <img src={BranchIcon} alt='Branch Icon' />
                <span>
                    {repoInfo.full_name}
                </span>
            </h3>
        </div>
        {
            repoInfo.recent_builds.length
                ? <div className='repo-preview'>
                    <p className='service'>
                        <img src={GithubIcon} alt='Github Icon' />
                    </p>
                    <p className='repo-status'>
                        <span className='name'>BUILD</span>
                        <span className={`status ${bgrStyle[repoInfo.recent_builds[0].status]}`}>
                            {repoInfo.recent_builds[0].status}
                        </span>
                    </p>
                    <p className='icon-text'>
                        <img src={LanguageIcon} alt='Language Icon' />
                        <span>Language: <span className='lead'>{repoInfo.project_type}</span></span>
                    </p>
                    <p className='icon-text'>
                        <img src={Coverage} alt='Coverage Icon' />
                        <span>Coverage: <span className='lead'>
                            {
                                repoInfo.coverage_scorenull
                                    ? `${repoInfo.coverage_scorenull  }%`
                                    : '0 %'
                            }
                        </span>
                        </span>
                    </p>
                </div>
                : null
        }

    </div>
)

export default RepositoryInfo
