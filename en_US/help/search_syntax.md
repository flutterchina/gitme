# Github搜索语法

通常情况下您直接通过输入关键字就可满足基本搜索需求，但是有时您可能希望能够通过指定多种规则来精确查找，这时候您就可以使用github搜索语法。由于github搜索语法本身比较复杂，本文只介绍一些简单实用的语法，但APP支持所有搜索语法。详情请参考[github搜索语法](https://developer.github.com/v3/search/)。

## 查找项目

| 参数名  | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| `q`     | **必须指定**，搜索关键字                                     |
| `sort`  | 排序字段. 可以是  `stars`、 `forks`或 `updated` 。默认以最佳匹配排序 |
| `order` | 如果 `sort` 参数指定了，此字段可以为 `asc` 或 `desc`。 默认为: `desc` |

q中可以使用language、fork、star等筛选条件，完整的列表请参照 [github查找项目](https://developer.github.com/v3/search/#search-repositories).

### 示例

搜索语言为Javascript，名称为“fly”的开源项目。

```
q=fly+language:javascript
```

[📱点我试一试](gm://route/search?type=repo&q=fly%2Blanguage%3Ajavascript)

我们添加一个排序字段，按star数排序

```
q=fly+language:javascript&sort=stars
```

[📱点我试一试](gm://route/search?type=repo&q=fly%2Blanguage%3Ajavascript%26sort%3Dstars)

我们添加一个排序规则，按star数从小到大排序

```
q=fly+language:javascript&sort=stars&order=asc
```

[📱点我试一试](gm://route/search?type=repo&q=fly%2Blanguage%3Ajavascript%26sort%3Dstars%26order%3Dasc)



## 查找Issue

| 参数名  | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| `q`     | **必须指定**，搜索关键字                                     |
| `sort`  | 排序字段，可以是  `comments`, `created`, 或 `updated`. 默认以最佳匹配排序 |
| `order` | 如果 `sort` 参数指定了，此字段可以为 `asc` 或 `desc`。 默认为: `desc` |

q中可以使用state、label、author、language等筛选条件，完整的列表请参照 [github查找issue](https://developer.github.com/v3/search/#search-issues).

### 示例

查找关键字为vue的所有状态为“open”，label为“bug”并且语言为Javascript的issue，并按照评论数量排序

```
vue+label:bug+language:javascript&sort=comments
```

[📱点我试一试](gm://route/search?type=issue&q=vue%2Bstate%3Aopen%2Blabel%3Abug%2Blanguage%3Ajavascript%26sort%3Dcomments)



## 查找用户、组织

| 参数名  | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| `q`     | **必须指定**，搜索关键字                                     |
| `sort`  | 排序字段，可以是  `followers`, `repositories`, 或 `joined`. 默认以最佳匹配排序 |
| `order` | 如果 `sort` 参数指定了，此字段可以为 `asc` 或 `desc`。 默认为: `desc` |

q中可以使用type、location、followers等筛选条件，完整的列表请参照 [github查找用户](https://developer.github.com/v3/search/#search-users).

### 示例

查找名称为"vue"的**组织**

```
vue+type:org
```

[📱点我试一试](gm://route/search?type=user&q=vue%2Btype%3Aorg)


